import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {
  AddSponsor,
  AddSponsorFailed,
  AddSponsorSuccess,
  DeleteSponsor,
  DeleteSponsorFailed,
  DeleteSponsorSuccess,
  FilterByCountry,
  FilterByCountryFailed,
  FilterByCountrySuccess,
  GetSponsorsFailed,
  GetSponsorsSuccess,
  SortByCountry, SortByCountryFailed, SortByCountrySuccess,
  SponsorsActionType,
  UpdateSponsor,
  UpdateSponsorFailed,
  UpdateSponsorSuccess
} from './sponsor.actions';

import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Sponsor} from './sponsor.model';
import {SponsorService} from './sponsor.service';

@Injectable()
export class SponsorsEffects {

  @Effect()
  getSponsors$ = this.actions$.pipe(
    ofType(SponsorsActionType.GET_SPONSORS),
    switchMap(() =>
      this.sponsorService.getSponsors().pipe(
        map((sponsor: Array<Sponsor>) => new GetSponsorsSuccess(sponsor)),
        catchError(error => of(new GetSponsorsFailed(error)))
      )
    )
  );

  @Effect()
  filterByCountry$ = this.actions$.pipe(
    ofType(SponsorsActionType.FILTER_BY_COUNTRY),
    switchMap((action) =>
      this.sponsorService.getSponsorsByCountry((action as FilterByCountry).payload).pipe(
        map((sponsor: Array<Sponsor>) => new FilterByCountrySuccess(sponsor)),
        catchError(error => of(new FilterByCountryFailed(error)))
      )
    )
  );

  @Effect()
  sortByCountry$ = this.actions$.pipe(
    ofType(SponsorsActionType.SORT_BY_COUNTRY),
    switchMap((action) =>
      this.sponsorService.getSponsorsSortedByCountry((action as SortByCountry).payload).pipe(
        map((sponsor: Array<Sponsor>) => new SortByCountrySuccess(sponsor)),
        catchError(error => of(new SortByCountryFailed(error)))
      )
    )
  );

  @Effect()
  addSponsor$ = this.actions$.pipe(
    ofType(SponsorsActionType.ADD_SPONSOR),
    switchMap((action) =>
      this.sponsorService.addSponsor((action as AddSponsor).payload).pipe(
        map((sponsor: Sponsor) => new AddSponsorSuccess(sponsor)),
        catchError(error => of(new AddSponsorFailed(error)))
      )
    )
  );

  @Effect()
  updateSponsor$ = this.actions$.pipe(
    ofType(SponsorsActionType.UPDATE_SPONSOR),
    switchMap((action) =>
      this.sponsorService.updateSponsor((action as UpdateSponsor).payload).pipe(
        map((sponsor: Sponsor) => new UpdateSponsorSuccess(sponsor)),
        catchError(error => of(new UpdateSponsorFailed(error)))
      )
    )
  );

  @Effect()
  deleteSponsor$ = this.actions$.pipe(
    ofType(SponsorsActionType.DELETE_SPONSOR),
    switchMap((action) =>
      this.sponsorService.deleteSponsor((action as DeleteSponsor).payload).pipe(
        map((sponsorId: number) => new DeleteSponsorSuccess(sponsorId)),
        catchError(error => of(new DeleteSponsorFailed(error)))
      )
    )
  );

  constructor(private actions$: Actions, private sponsorService: SponsorService) {
  }

}
