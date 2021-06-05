import {Component, OnInit, ViewChild} from '@angular/core';
import {Juror} from '../shared/juror.model';
import {JurorService} from '../shared/juror.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import {UpdateJurorDialogComponent} from './update-juror-dialog/update-juror-dialog.component';
import {AddJurorDialogComponent} from './add-juror-dialog/add-juror-dialog.component';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-jurors-table',
  templateUrl: './jurors-table.component.html',
  styleUrls: ['./jurors-table.component.css']
})
export class JurorsTableComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'country', 'age', 'deleteButton', 'updateButton'];

  dataSource: MatTableDataSource<Juror>;

  jurors: Juror[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private jurorService: JurorService, public dialog: MatDialog) {
  }

  reloadTable(): void {
    this.jurorService
      .getJurors()
      .subscribe(jurors => {
        this.jurors = jurors;
        this.updateDataSource(jurors);
      });
  }

  ngOnInit(): void {
    this.reloadTable();
  }

  updateDataSource(jurors: Juror[]): void {
    this.dataSource = new MatTableDataSource<Juror>(jurors);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFirstNameFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.jurorService
      .getJurorsByFirstName(filterValue)
      .subscribe(jurors => {
        this.jurors = jurors;
        this.updateDataSource(jurors);
      });
  }

  applyLastNameFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredSponsors = this.jurors.filter(juror => juror.lastName.toLowerCase().includes(filterValue));
    this.updateDataSource(filteredSponsors);
  }

  applyCountryFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.jurorService
      .getJurorsByCountry(filterValue)
      .subscribe(jurors => {
        this.jurors = jurors;
        this.updateDataSource(jurors);
      });
  }

  applyAgeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredSponsors = this.jurors.filter(juror => juror.age.toString().toLowerCase().includes(filterValue));
    this.updateDataSource(filteredSponsors);
  }

  deleteJuror(juror: Juror): void {
    this.jurorService
      .deleteJuror(juror.id)
      .subscribe(
        successResponse => {
          swal.fire({
              title: 'The juror was successfully deleted! 🙂',
              icon: 'success'
            }
          );
          this.reloadTable();
        },
        errorResponse => {
          swal.fire({
              title: 'The juror could not be deleted! 🙁',
              icon: 'error'
            }
          );
        }
      );
  }

  updateJuror(juror: Juror): void {
    const dialogData = new Juror(juror.id, juror.firstName, juror.lastName, juror.country, juror.age);

    const dialogRef = this.dialog.open(UpdateJurorDialogComponent, {
      width: '20%',
      data: dialogData
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.jurorService
            .updateJuror(result)
            .subscribe(
              successResponse => {
                console.log(successResponse);
                swal.fire({
                    title: 'The juror was successfully updated! 🙂',
                    icon: 'success'
                  }
                );
                this.reloadTable();
              },
              errorResponse => {
                console.log(errorResponse);
                swal.fire({
                    title: 'The juror could not be updated! 🙁',
                    icon: 'error'
                  }
                );
              }
            );
        }
      });
  }

  addJuror(): void {
    const dialogData = new Juror(null, null, null, null, null);
    console.log(dialogData);

    const dialogRef = this.dialog.open(AddJurorDialogComponent, {
      width: '20%',
      data: dialogData
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.jurorService
            .addJuror(result)
            .subscribe(
              successResponse => {
                swal.fire({
                    title: 'The juror was successfully added! 🙂',
                    icon: 'success'
                  }
                );
                this.reloadTable();
              },
              errorResponse => {
                swal.fire({
                    title: 'The juror could not be added! 🙁',
                    icon: 'error'
                  }
                );
              }
            );
        }
      });
  }

}
