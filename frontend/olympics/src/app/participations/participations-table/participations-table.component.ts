import {Component, OnInit, ViewChild} from '@angular/core';
import {Participation} from '../shared/participation.model';
import {ParticipationService} from '../shared/participation.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';
import {AddParticipationDialogComponent} from './add-participation-dialog/add-participation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateParticipationDialogComponent} from './update-participation-dialog/update-participation-dialog.component';
import {MatSort} from '@angular/material/sort';
import {CompetitionService} from '../../competitions/shared/competition.service';
import {AthleteService} from '../../athletes/shared/athlete.service';
import {Athlete} from '../../athletes/shared/athlete.model';
import {Competition} from '../../competitions/shared/competition.model';

@Component({
  selector: 'app-participations-table',
  templateUrl: './participations-table.component.html',
  styleUrls: ['./participations-table.component.css']
})
export class ParticipationsTableComponent implements OnInit {

  displayedColumns: string[] = ['competitionId', 'competitionName', 'athleteId', 'athleteName', 'rank', 'deleteButton', 'updateButton'];

  dataSource: MatTableDataSource<Participation>;

  participations: Participation[];

  athletes: Athlete[];
  competitions: Competition[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private participationService: ParticipationService,
              private competitionService: CompetitionService,
              private athleteService: AthleteService,
              public dialog: MatDialog) {
  }

  reloadTable(): void {
    this.participationService
      .getParticipations()
      .subscribe(participations => {

        for (const participation of participations) {
          const athlete = this.athletes?.find(ath => ath.id === participation?.athleteId);
          const competition = this.competitions?.find(comp => comp.id === participation?.competitionId);

          participation.athleteName = athlete?.lastName + ' ' + athlete?.firstName;
          participation.competitionName = competition?.name;
        }

        this.participations = participations;
        this.updateDataSource(participations);
      });
  }

  fetchAthletes(): void {
    this.athleteService
      .getAthletes()
      .subscribe(athletes => {
        this.athletes = athletes;
        this.fetchCompetitions();
      });
  }

  fetchCompetitions(): void {
    this.competitionService
      .getCompetitions()
      .subscribe(competitions => {
        this.competitions = competitions;
        this.reloadTable();
      });
  }

  ngOnInit(): void {
    // this.fetchCompetitions();
    this.fetchAthletes();
    // this.reloadTable();
  }

  updateDataSource(participations: Participation[]): void {
    this.dataSource = new MatTableDataSource<Participation>(participations);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyCompetitionIdFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredParticipations = this.participations
      .filter(participation => participation.competitionId.toString().toLowerCase().includes(filterValue));
    this.updateDataSource(filteredParticipations);
  }

  applyAthleteIdFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredParticipations = this.participations
      .filter(participation => participation.athleteId.toString().toLowerCase().includes(filterValue));
    this.updateDataSource(filteredParticipations);
  }

  deleteParticipation(participation: Participation): void {
    this.participationService
      .deleteParticipation(participation.id)
      .subscribe(
        successResponse => {
          console.log(successResponse);
          swal.fire({
              title: 'The participation was successfully deleted! 🙂',
              icon: 'success'
            }
          );
          this.ngOnInit();
        },
        errorResponse => {
          console.log(errorResponse);
          swal.fire({
              title: 'The participation could not be deleted! 🙁',
              icon: 'error'
            }
          );
        }
      );
  }

  updateParticipation(participation: Participation): void {
    const dialogData = new Participation(participation.id, participation.competitionId, participation.athleteId, participation.rank);

    const dialogRef = this.dialog.open(UpdateParticipationDialogComponent, {
      width: '20%',
      data: dialogData
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.participationService
            .updateParticipation(result)
            .subscribe(
              successResponse => {
                console.log(successResponse);
                swal.fire({
                    title: 'The participation was successfully updated! 🙂',
                    icon: 'success'
                  }
                );
                this.ngOnInit();
              },
              errorResponse => {
                console.log(errorResponse);
                swal.fire({
                    title: 'The participation could not be updated! 🙁',
                    icon: 'error'
                  }
                );
              }
            );
        }
      });
  }

  addParticipation(): void {
    const dialogData = new Participation(null, null, null, null);
    console.log(dialogData);

    const dialogRef = this.dialog.open(AddParticipationDialogComponent, {
      width: '20%',
      data: {participation: dialogData, athletes: this.athletes, competitions: this.competitions}
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.participationService
            .addParticipation(result)
            .subscribe(
              successResponse => {
                swal.fire({
                    title: 'The participation was successfully added! 🙂',
                    icon: 'success'
                  }
                );
                this.ngOnInit();
              },
              errorResponse => {
                swal.fire({
                    title: 'The participation could not be added! 🙁',
                    icon: 'error'
                  }
                );
              }
            );
        }
      });
  }

}
