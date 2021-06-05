import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Juror} from '../../shared/juror.model';

@Component({
  selector: 'app-add-juror-dialog',
  templateUrl: './add-juror-dialog.component.html',
  styleUrls: ['./add-juror-dialog.component.css']
})
export class AddJurorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddJurorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public juror: Juror) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
