import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Sponsor} from '../../shared/sponsor.model';

@Component({
  selector: 'app-update-sponsor-dialog',
  templateUrl: './update-sponsor-dialog.component.html',
  styleUrls: ['./update-sponsor-dialog.component.css']
})
export class UpdateSponsorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateSponsorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sponsor: Sponsor) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
