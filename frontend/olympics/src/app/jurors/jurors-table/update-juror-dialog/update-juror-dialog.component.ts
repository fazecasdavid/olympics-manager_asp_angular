import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Juror} from '../../shared/juror.model';

@Component({
  selector: 'app-update-juror-dialog',
  templateUrl: './update-juror-dialog.component.html',
  styleUrls: ['./update-juror-dialog.component.css']
})
export class UpdateJurorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateJurorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public juror: Juror) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
