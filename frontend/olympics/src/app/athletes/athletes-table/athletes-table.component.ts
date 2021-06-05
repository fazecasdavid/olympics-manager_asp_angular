import {Component, OnInit, ViewChild} from '@angular/core';
import {Athlete} from '../shared/athlete.model';
import {AthleteService} from '../shared/athlete.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import {UpdateAthleteDialogComponent} from './update-athlete-dialog/update-athlete-dialog.component';
import {AddAthleteDialogComponent} from './add-athlete-dialog/add-athlete-dialog.component';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-athletes-table',
  templateUrl: './athletes-table.component.html',
  styleUrls: ['./athletes-table.component.css']
})
export class AthletesTableComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'country', 'age', 'deleteButton', 'updateButton'];

  dataSource: MatTableDataSource<Athlete>;

  athletes: Athlete[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private athleteService: AthleteService, public dialog: MatDialog) {
  }

  reloadTable(): void {
    this.athleteService
      .getAthletes()
      .subscribe(athletes => {
        this.athletes = athletes;
        this.updateDataSource(athletes);
      });
  }

  ngOnInit(): void {
    this.reloadTable();
  }

  updateDataSource(athletes: Athlete[]): void {
    this.dataSource = new MatTableDataSource<Athlete>(athletes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFirstNameFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.athleteService
      .getAthletesByFirstName(filterValue)
      .subscribe(athletes => {
        this.athletes = athletes;
        this.updateDataSource(athletes);
      });
  }

  applyLastNameFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredSponsors = this.athletes.filter(athlete => athlete.lastName.toLowerCase().includes(filterValue));
    this.updateDataSource(filteredSponsors);
  }

  applyCountryFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.athleteService
      .getAthletesByCountry(filterValue)
      .subscribe(athletes => {
        this.athletes = athletes;
        this.updateDataSource(athletes);
      });
  }

  applyAgeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredSponsors = this.athletes.filter(athlete => athlete.age.toString().toLowerCase().includes(filterValue));
    this.updateDataSource(filteredSponsors);
  }

  deleteAthlete(athlete: Athlete): void {
    this.athleteService
      .deleteAthlete(athlete.id)
      .subscribe(
        successResponse => {
          swal.fire({
              title: 'The athlete was successfully deleted! 🙂',
              icon: 'success'
            }
          );
          this.reloadTable();
        },
        errorResponse => {
          swal.fire({
              title: 'The athlete could not be deleted! 🙁',
              icon: 'error'
            }
          );
        }
      );
  }

  updateAthlete(athlete: Athlete): void {
    const dialogData = new Athlete(athlete.id, athlete.firstName, athlete.lastName, athlete.country, athlete.age);

    const dialogRef = this.dialog.open(UpdateAthleteDialogComponent, {
      width: '20%',
      data: dialogData
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.athleteService
            .updateAthlete(result)
            .subscribe(
              successResponse => {
                console.log(successResponse);
                swal.fire({
                    title: 'The athlete was successfully updated! 🙂',
                    icon: 'success'
                  }
                );
                this.reloadTable();
              },
              errorResponse => {
                console.log(errorResponse);
                swal.fire({
                    title: 'The athlete could not be updated! 🙁',
                    icon: 'error'
                  }
                );
              }
            );
        }
      });
  }

  addAthlete(): void {
    const dialogData = new Athlete(null, null, null, null, null);
    console.log(dialogData);

    const dialogRef = this.dialog.open(AddAthleteDialogComponent, {
      width: '20%',
      data: dialogData
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.athleteService
            .addAthlete(result)
            .subscribe(
              successResponse => {
                swal.fire({
                    title: 'The athlete was successfully added! 🙂',
                    icon: 'success'
                  }
                );
                this.reloadTable();
              },
              errorResponse => {
                swal.fire({
                    title: 'The athlete could not be added! 🙁',
                    icon: 'error'
                  }
                );
              }
            );
        }
      });
  }

}
