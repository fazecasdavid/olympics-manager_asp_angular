import {Component, OnInit, ViewChild} from '@angular/core';
import {Sponsorship} from '../shared/sponsorship.model';
import {SponsorshipService} from '../shared/sponsorship.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';
import {AddSponsorshipDialogComponent} from './add-sponsorship-dialog/add-sponsorship-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateSponsorshipDialogComponent} from './update-sponsorship-dialog/update-sponsorship-dialog.component';
import {MatSort} from '@angular/material/sort';
import {CompetitionService} from '../../competitions/shared/competition.service';

@Component({
  selector: 'app-sponsorships-table',
  templateUrl: './sponsorships-table.component.html',
  styleUrls: ['./sponsorships-table.component.css']
})
export class SponsorshipsTableComponent implements OnInit {

  displayedColumns: string[] = ['competitionId', 'sponsorId', 'moneyContribution', 'deleteButton', 'updateButton'];

  dataSource: MatTableDataSource<Sponsorship>;

  sponsorships: Sponsorship[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private sponsorshipService: SponsorshipService, private competitionService: CompetitionService, public dialog: MatDialog) {
  }

  reloadTable(): void {
    this.sponsorshipService
      .getSponsorships()
      .subscribe(sponsorships => {
        this.sponsorships = sponsorships;
        this.updateDataSource(sponsorships);
      });
  }

  ngOnInit(): void {
    this.reloadTable();
  }

  updateDataSource(sponsorships: Sponsorship[]): void {
    this.dataSource = new MatTableDataSource<Sponsorship>(sponsorships);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyCompetitionIdFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredSponsorships = this.sponsorships
      .filter(sponsorship => sponsorship.competitionId.toString().toLowerCase().includes(filterValue));
    this.updateDataSource(filteredSponsorships);
  }

  applySponsorIdFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredSponsorships = this.sponsorships
      .filter(sponsorship => sponsorship.sponsorId.toString().toLowerCase().includes(filterValue));
    this.updateDataSource(filteredSponsorships);
  }

  applyMoneyContributionFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.sponsorshipService
      .getSponsorshipsByMoneyContribution(filterValue)
      .subscribe(sponsorships => {
        this.sponsorships = sponsorships;
        this.updateDataSource(sponsorships);
      });
  }

  deleteSponsorship(sponsorship: Sponsorship): void {
    this.sponsorshipService
      .deleteSponsorship(sponsorship.id)
      .subscribe(
        successResponse => {
          console.log(successResponse);
          swal.fire({
              title: 'The sponsorship was successfully deleted! 🙂',
              icon: 'success'
            }
          );
          this.reloadTable();
        },
        errorResponse => {
          console.log(errorResponse);
          swal.fire({
              title: 'The sponsorship could not be deleted! 🙁',
              icon: 'error'
            }
          );
        }
      );
  }

  updateSponsorship(sponsorship: Sponsorship): void {
    const dialogData = new Sponsorship(sponsorship.id, sponsorship.competitionId, sponsorship.sponsorId, sponsorship.moneyContribution);

    const dialogRef = this.dialog.open(UpdateSponsorshipDialogComponent, {
      width: '20%',
      data: dialogData
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.sponsorshipService
            .updateSponsorship(result)
            .subscribe(
              successResponse => {
                console.log(successResponse);
                swal.fire({
                    title: 'The sponsorship was successfully updated! 🙂',
                    icon: 'success'
                  }
                );
                this.reloadTable();
              },
              errorResponse => {
                console.log(errorResponse);
                swal.fire({
                    title: 'The sponsorship could not be updated! 🙁',
                    icon: 'error'
                  }
                );
              }
            );
        }
      });
  }

  addSponsorship(): void {
    const dialogData = new Sponsorship(null, null, null, null);
    console.log(dialogData);

    const dialogRef = this.dialog.open(AddSponsorshipDialogComponent, {
      width: '20%',
      data: dialogData
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          this.sponsorshipService
            .addSponsorship(result)
            .subscribe(
              successResponse => {
                swal.fire({
                    title: 'The sponsorship was successfully added! 🙂',
                    icon: 'success'
                  }
                );
                this.reloadTable();
              },
              errorResponse => {
                swal.fire({
                    title: 'The sponsorship could not be added! 🙁',
                    icon: 'error'
                  }
                );
              }
            );
        }
      });
  }

}
