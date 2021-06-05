import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Sponsorship} from '../../shared/sponsorship.model';

@Component({
  selector: 'app-update-sponsorship-dialog',
  templateUrl: './update-sponsorship-dialog.component.html',
  styleUrls: ['./update-sponsorship-dialog.component.css']
})
export class UpdateSponsorshipDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateSponsorshipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sponsorship: Sponsorship) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
