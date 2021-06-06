import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Participation} from '../../shared/participation.model';
import {Athlete} from '../../../athletes/shared/athlete.model';
import {Competition} from '../../../competitions/shared/competition.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-participation-dialog',
  templateUrl: './add-participation-dialog.component.html',
  styleUrls: ['./add-participation-dialog.component.css']
})
export class AddParticipationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddParticipationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      participation: Participation, athletes: Athlete[], competitions: Competition[]
    }) {
  }

  athlete?: Athlete;
  competition?: Competition;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.data.participation.rank && this.competition?.id && this.athlete?.id) {
      const participation = new Participation(null, this.competition?.id, this.athlete?.id, this.data.participation.rank);

      this.dialogRef.close(participation);
    }
  }
}
