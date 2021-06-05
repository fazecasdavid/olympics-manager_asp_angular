import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Sponsor} from '../../shared/sponsor.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-sponsor-dialog',
  templateUrl: './add-sponsor-dialog.component.html',
  styleUrls: ['./add-sponsor-dialog.component.css']
})
export class AddSponsorDialogComponent {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<AddSponsorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sponsor: Sponsor) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
