import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Athlete} from '../../shared/athlete.model';

@Component({
  selector: 'app-update-athlete-dialog',
  templateUrl: './update-athlete-dialog.component.html',
  styleUrls: ['./update-athlete-dialog.component.css']
})
export class UpdateAthleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateAthleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public athlete: Athlete) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
