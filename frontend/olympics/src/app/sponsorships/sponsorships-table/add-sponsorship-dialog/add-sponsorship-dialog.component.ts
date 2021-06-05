import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Sponsorship} from '../../shared/sponsorship.model';

@Component({
  selector: 'app-add-sponsorship-dialog',
  templateUrl: './add-sponsorship-dialog.component.html',
  styleUrls: ['./add-sponsorship-dialog.component.css']
})
export class AddSponsorshipDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddSponsorshipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sponsorship: Sponsorship) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
