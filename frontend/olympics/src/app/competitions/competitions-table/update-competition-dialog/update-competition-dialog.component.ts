import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Competition} from '../../shared/competition.model';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {PICK_FORMATS, PickDateAdapter} from '../../shared/date.utils';

@Component({
  selector: 'app-update-competition-dialog',
  templateUrl: './update-competition-dialog.component.html',
  styleUrls: ['./update-competition-dialog.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class UpdateCompetitionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateCompetitionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public competition: Competition) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
