import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SponsorsComponent} from './sponsors/sponsors.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {SponsorshipsComponent} from './sponsorships/sponsorships.component';
import {SponsorsTableComponent} from './sponsors/sponsors-table/sponsors-table.component';
import {SponsorshipsTableComponent} from './sponsorships/sponsorships-table/sponsorships-table.component';
import {MatTableModule} from '@angular/material/table';
import {SponsorService} from './sponsors/shared/sponsor.service';
import {SponsorshipService} from './sponsorships/shared/sponsorship.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {UpdateSponsorDialogComponent} from './sponsors/sponsors-table/update-sponsor-dialog/update-sponsor-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddSponsorDialogComponent} from './sponsors/sponsors-table/add-sponsor-dialog/add-sponsor-dialog.component';
import {AddSponsorshipDialogComponent} from './sponsorships/sponsorships-table/add-sponsorship-dialog/add-sponsorship-dialog.component';
import {UpdateSponsorshipDialogComponent} from './sponsorships/sponsorships-table/update-sponsorship-dialog/update-sponsorship-dialog.component';
import {MatSortModule} from '@angular/material/sort';
import {AthletesComponent} from './athletes/athletes.component';
import {AthletesTableComponent} from './athletes/athletes-table/athletes-table.component';
import {AddAthleteDialogComponent} from './athletes/athletes-table/add-athlete-dialog/add-athlete-dialog.component';
import {UpdateAthleteDialogComponent} from './athletes/athletes-table/update-athlete-dialog/update-athlete-dialog.component';
import {AthleteService} from './athletes/shared/athlete.service';
import {CompetitionService} from './competitions/shared/competition.service';
import {CompetitionsComponent} from './competitions/competitions.component';
import {CompetitionsTableComponent} from './competitions/competitions-table/competitions-table.component';
import {AddCompetitionDialogComponent} from './competitions/competitions-table/add-competition-dialog/add-competition-dialog.component';
import {UpdateCompetitionDialogComponent} from './competitions/competitions-table/update-competition-dialog/update-competition-dialog.component';
import {ParticipationsComponent} from './participations/participations.component';
import {JurorsComponent} from './jurors/jurors.component';
import {ParticipationsTableComponent} from './participations/participations-table/participations-table.component';
import {JurorsTableComponent} from './jurors/jurors-table/jurors-table.component';
import {AddParticipationDialogComponent} from './participations/participations-table/add-participation-dialog/add-participation-dialog.component';
import {AddJurorDialogComponent} from './jurors/jurors-table/add-juror-dialog/add-juror-dialog.component';
import {UpdateParticipationDialogComponent} from './participations/participations-table/update-participation-dialog/update-participation-dialog.component';
import {UpdateJurorDialogComponent} from './jurors/jurors-table/update-juror-dialog/update-juror-dialog.component';
import {ParticipationService} from './participations/shared/participation.service';
import {JurorService} from './jurors/shared/juror.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ActionReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SponsorsEffects} from './sponsors/shared/sponsor.effects';
import {sponsorReducer} from './sponsors/shared/sponsor.reducer';
import {storeLogger} from 'ngrx-store-logger';

export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer);
}

export const metaReducers = [];

@NgModule({
  declarations: [
    AppComponent,
    AthletesComponent,
    ParticipationsComponent,
    CompetitionsComponent,
    SponsorshipsComponent,
    SponsorsComponent,
    JurorsComponent,
    AthletesTableComponent,
    ParticipationsTableComponent,
    CompetitionsTableComponent,
    SponsorshipsTableComponent,
    SponsorsTableComponent,
    JurorsTableComponent,
    UpdateSponsorDialogComponent,
    AddAthleteDialogComponent,
    AddParticipationDialogComponent,
    AddCompetitionDialogComponent,
    AddSponsorshipDialogComponent,
    AddSponsorDialogComponent,
    AddJurorDialogComponent,
    UpdateAthleteDialogComponent,
    UpdateParticipationDialogComponent,
    UpdateCompetitionDialogComponent,
    UpdateSponsorshipDialogComponent,
    UpdateSponsorDialogComponent,
    UpdateJurorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('sponsors', sponsorReducer, {metaReducers}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([SponsorsEffects]),
    ReactiveFormsModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [AthleteService, ParticipationService, CompetitionService, SponsorshipService, SponsorService, JurorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
