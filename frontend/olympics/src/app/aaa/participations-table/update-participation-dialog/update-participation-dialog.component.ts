import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Participation} from '../../shared/participation.model';

@Component({
  selector: 'app-update-participation-dialog',
  templateUrl: './update-participation-dialog.component.html',
  styleUrls: ['./update-participation-dialog.component.css']
})
export class UpdateParticipationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateParticipationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public participation: Participation) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
