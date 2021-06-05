import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SponsorsComponent} from './sponsors/sponsors.component';
import {SponsorshipsComponent} from './sponsorships/sponsorships.component';
import {AthletesComponent} from './athletes/athletes.component';
import {CompetitionsComponent} from './competitions/competitions.component';
import {ParticipationsComponent} from './participations/participations.component';
import {JurorsComponent} from './jurors/jurors.component';

const routes: Routes = [
  {path: 'athletes', component: AthletesComponent},
  {path: 'participations', component: ParticipationsComponent},
  {path: 'competitions', component: CompetitionsComponent},
  {path: 'sponsorships', component: SponsorshipsComponent},
  {path: 'sponsors', component: SponsorsComponent},
  {path: 'jurors', component: JurorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
