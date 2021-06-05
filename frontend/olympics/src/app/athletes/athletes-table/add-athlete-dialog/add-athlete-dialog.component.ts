import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Athlete} from '../../shared/athlete.model';

@Component({
  selector: 'app-add-athlete-dialog',
  templateUrl: './add-athlete-dialog.component.html',
  styleUrls: ['./add-athlete-dialog.component.css']
})
export class AddAthleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddAthleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public athlete: Athlete) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
