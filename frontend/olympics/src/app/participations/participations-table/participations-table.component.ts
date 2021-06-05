import {Component, OnInit, ViewChild} from '@angular/core';
import {Participation} from '../shared/participation.model';
import {ParticipationService} from '../shared/participation.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import {UpdateParticipationDialogComponent} from './update-participation-dialog/update-participation-dialog.component';
import {AddParticipationDialogComponent} from './add-participation-dialog/add-participation-dialog.component';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-participations-table',
  templateUrl: './participations-table.component.html',
  styleUrls: ['./participations-table.component.css']
})
export class ParticipationsTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'country', 'deleteButton', 'updateButton'];

  dataSource: MatTableDataSource<Participation>;

  participations: Participation[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private participationService: ParticipationService, public dialog: MatDialog) {
  }

  reloadTable(): void {
    this.participationService
      .getParticipations()
      .subscribe(participations => {
        this.participations = participations;
        this.updateDataSource(participations);
      });
  }

  ngOnInit(): void {
    this.reloadTable();
  }

  updateDataSource(participations: Participation[]): void {
    this.dataSource = new MatTableDataSource<Participation>(participations);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyNameFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredParticipations = this.participations.filter(participation => participation.name.toLowerCase().includes(filterValue));
    this.updateDataSource(filteredParticipations);
  }

  applyCountryFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.participationService
      .getParticipationsByCountry(filterValue)
      .subscribe(participations => {
        this.participations = participations;
        this.updateDataSource(participations);
      });
  }

  deleteParticipation(participation: Participation): void {
    this.participationService
      .deleteParticipation(participation.id)
      .subscribe(
        successResponse => {
          swal.fire({
              title: 'The participation was successfully deleted! 🙂',
              icon: 'success'
            }
          );
          this.reloadTable();
        },
        errorResponse => {
          swal.fire({
              title: 'The participation could not be deleted! 🙁',
              icon: 'error'
            }
          );
        }
      );
  }

  updateParticipation(participation: Participation): void {
    const dialogData = new Participation(participation.id, participation.name, participation.country);

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
                this.reloadTable();
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
    const dialogData = new Participation(null, null, null);
    console.log(dialogData);

    const dialogRef = this.dialog.open(AddParticipationDialogComponent, {
      width: '20%',
      data: dialogData
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
                this.reloadTable();
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
