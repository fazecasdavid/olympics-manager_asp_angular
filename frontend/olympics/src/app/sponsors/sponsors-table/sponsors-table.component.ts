import {Component, OnInit, ViewChild} from '@angular/core';
import {Sponsor} from '../shared/sponsor.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {UpdateSponsorDialogComponent} from './update-sponsor-dialog/update-sponsor-dialog.component';
import {AddSponsorDialogComponent} from './add-sponsor-dialog/add-sponsor-dialog.component';
import {MatSort} from '@angular/material/sort';
import {Store} from '@ngrx/store';
import * as SponsorActions from '../shared/sponsor.actions';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sponsors-table',
  templateUrl: './sponsors-table.component.html',
  styleUrls: ['./sponsors-table.component.css']
})
export class SponsorsTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'country', 'deleteButton', 'updateButton'];

  dataSource: MatTableDataSource<Sponsor>;

  sponsors: Sponsor[];

  countrySortDirection = 'default';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<any>, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.dispatch(new SponsorActions.GetSponsors());
    this.store.select('sponsors')
      .subscribe(response => {
        if (response.showNotification) {
          swal.fire({
              title: response.notificationMessage,
              icon: response.status
            }
          ).then();
        }
        this.sponsors = response.sponsorList;
        this.updateDataSource(this.sponsors);
      });
  }

  updateDataSource(sponsors: Sponsor[]): void {
    this.dataSource = new MatTableDataSource<Sponsor>(sponsors);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyNameFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredSponsors = this.sponsors.filter(sponsor => sponsor.name.toLowerCase().includes(filterValue));
    this.updateDataSource(filteredSponsors);
  }

  applyCountryFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.store.dispatch(new SponsorActions.FilterByCountry(filterValue));
  }

  deleteSponsor(sponsor: Sponsor): void {
    this.store.dispatch(new SponsorActions.DeleteSponsor(sponsor.id));
  }

  updateSponsor(sponsor: Sponsor): void {
    const dialogData = new Sponsor(sponsor.id, sponsor.name, sponsor.country);

    const dialogRef = this.dialog.open(UpdateSponsorDialogComponent, {
      width: '20%',
      data: dialogData
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.store.dispatch(new SponsorActions.UpdateSponsor(result));
        }
      });
  }

  addSponsor(): void {
    const dialogRef = this.dialog.open(AddSponsorDialogComponent, {
      width: '20%',
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.store.dispatch(new SponsorActions.AddSponsor(new Sponsor(null, result.value.name, result.value.country)));
        }
      });
  }

  sortByCountry(): void {
    if (this.countrySortDirection === 'default') {
      this.countrySortDirection = 'ascending';
    } else if (this.countrySortDirection === 'ascending') {
      this.countrySortDirection = 'descending';
    } else {
      this.countrySortDirection = 'default';
    }
    this.store.dispatch(new SponsorActions.SortByCountry(this.countrySortDirection));
  }

}
