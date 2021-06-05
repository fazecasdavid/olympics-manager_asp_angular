import {Component, OnInit, ViewChild} from '@angular/core';
import {Competition} from '../shared/competition.model';
import {CompetitionService} from '../shared/competition.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import {UpdateCompetitionDialogComponent} from './update-competition-dialog/update-competition-dialog.component';
import {AddCompetitionDialogComponent} from './add-competition-dialog/add-competition-dialog.component';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-competitions-table',
  templateUrl: './competitions-table.component.html',
  styleUrls: ['./competitions-table.component.css']
})
export class CompetitionsTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'location', 'description', 'deleteButton', 'updateButton'];

  dataSource: MatTableDataSource<Competition>;

  competitions: Competition[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  dateFormatOptions: any = {year: 'numeric', month: '2-digit', day: '2-digit'};

  constructor(private competitionService: CompetitionService, public dialog: MatDialog) {
  }

  reloadTable(): void {
    this.competitionService
      .getCompetitions()
      .subscribe(competitions => {
        this.competitions = competitions;
        this.updateDataSource(competitions);
      });
  }

  ngOnInit(): void {
    this.reloadTable();
  }

  updateDataSource(competitions: Competition[]): void {
    for (const competition of competitions) {
      if (!(competition.date instanceof Date)) {
        competition.date = new Date(competition.date);
      }
    }
    this.dataSource = new MatTableDataSource<Competition>(competitions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyNameFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredCompetitions = this.competitions.filter(competition => competition.name.toLowerCase().includes(filterValue));
    this.updateDataSource(filteredCompetitions);
  }

  applyDateFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredCompetitions = this.competitions
      .filter(competition => competition.date.toLocaleDateString('en-GB', this.dateFormatOptions).toLowerCase().includes(filterValue));
    this.updateDataSource(filteredCompetitions);
  }

  applyDescriptionFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredCompetitions = this.competitions.filter(competition => competition.description.toLowerCase().includes(filterValue));
    this.updateDataSource(filteredCompetitions);
  }

  applyLocationFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.competitionService
      .getCompetitionsByLocation(filterValue)
      .subscribe(competitions => {
        this.competitions = competitions;
        this.updateDataSource(competitions);
      });
  }

  deleteCompetition(competition: Competition): void {
    this.competitionService
      .deleteCompetition(competition.id)
      .subscribe(
        successResponse => {
          swal.fire({
              title: 'The competition was successfully deleted! 🙂',
              icon: 'success'
            }
          );
          this.reloadTable();
        },
        errorResponse => {
          swal.fire({
              title: 'The competition could not be deleted! 🙁',
              icon: 'error'
            }
          );
        }
      );
  }

  updateCompetition(competition: Competition): void {
    const dialogData = new Competition(competition.id, competition.date, competition.location, competition.name, competition.description);

    const dialogRef = this.dialog.open(UpdateCompetitionDialogComponent, {
      width: '20%',
      data: dialogData
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        console.log(result);
        if (result !== undefined) {
          this.competitionService
            .updateCompetition(result)
            .subscribe(
              successResponse => {
                console.log(successResponse);
                swal.fire({
                    title: 'The competition was successfully updated! 🙂',
                    icon: 'success'
                  }
                );
                this.reloadTable();
              },
              errorResponse => {
                console.log(errorResponse);
                swal.fire({
                    title: 'The competition could not be updated! 🙁',
                    icon: 'error'
                  }
                );
              }
            );
        }
      });
  }

  addCompetition(): void {
    const dialogData = new Competition(null, null, null, null, null);
    console.log(dialogData);

    const dialogRef = this.dialog.open(AddCompetitionDialogComponent, {
      width: '20%',
      data: dialogData
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.competitionService
            .addCompetition(result)
            .subscribe(
              successResponse => {
                swal.fire({
                    title: 'The competition was successfully added! 🙂',
                    icon: 'success'
                  }
                );
                this.reloadTable();
              },
              errorResponse => {
                swal.fire({
                    title: 'The competition could not be added! 🙁',
                    icon: 'error'
                  }
                );
              }
            );
        }
      });
  }

}
