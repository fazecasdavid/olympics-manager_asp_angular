import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Participation} from '../../shared/participation.model';

@Component({
  selector: 'app-add-participation-dialog',
  templateUrl: './add-participation-dialog.component.html',
  styleUrls: ['./add-participation-dialog.component.css']
})
export class AddParticipationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddParticipationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public participation: Participation) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
