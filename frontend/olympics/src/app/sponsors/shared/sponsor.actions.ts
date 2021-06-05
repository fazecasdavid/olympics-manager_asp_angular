import {Action} from '@ngrx/store';
import {Sponsor} from './sponsor.model';

export enum SponsorsActionType {
  GET_SPONSORS = 'GET_SPONSORS',
  GET_SPONSORS_SUCCESS = 'GET_SPONSORS_SUCCESS',
  GET_SPONSORS_FAILED = 'GET_SPONSORS_FAILED',

  FILTER_BY_COUNTRY = 'FILTER_BY_COUNTRY',
  FILTER_BY_COUNTRY_SUCCESS = 'FILTER_BY_COUNTRY_SUCCESS',
  FILTER_BY_COUNTRY_FAILED = 'FILTER_BY_COUNTRY_FAILED',

  SORT_BY_COUNTRY = 'SORT_BY_COUNTRY',
  SORT_BY_COUNTRY_SUCCESS = 'SORT_BY_COUNTRY_SUCCESS',
  SORT_BY_COUNTRY_FAILED = 'SORT_BY_COUNTRY_FAILED',

  ADD_SPONSOR = 'ADD_SPONSOR',
  ADD_SPONSOR_SUCCESS = 'ADD_SPONSOR_SUCCESS',
  ADD_SPONSOR_FAILED = 'ADD_SPONSOR_FAILED',

  UPDATE_SPONSOR = 'UPDATE_SPONSOR',
  UPDATE_SPONSOR_SUCCESS = 'UPDATE_SPONSOR_SUCCESS',
  UPDATE_SPONSOR_FAILED = 'UPDATE_SPONSOR_FAILED',

  DELETE_SPONSOR = 'DELETE_SPONSOR',
  DELETE_SPONSOR_SUCCESS = 'DELETE_SPONSOR_SUCCESS',
  DELETE_SPONSOR_FAILED = 'DELETE_SPONSOR_FAILED'
}

export class GetSponsors implements Action {
  readonly type = SponsorsActionType.GET_SPONSORS;
}

export class GetSponsorsSuccess implements Action {
  readonly type = SponsorsActionType.GET_SPONSORS_SUCCESS;

  constructor(public payload: Array<Sponsor>) {
  }
}

export class GetSponsorsFailed implements Action {
  readonly type = SponsorsActionType.GET_SPONSORS_FAILED;

  constructor(public payload: string) {
  }
}

export class FilterByCountry implements Action {
  readonly type = SponsorsActionType.FILTER_BY_COUNTRY;

  constructor(public payload: string) {
  }
}

export class FilterByCountrySuccess implements Action {
  readonly type = SponsorsActionType.FILTER_BY_COUNTRY_SUCCESS;

  constructor(public payload: Array<Sponsor>) {
  }
}

export class FilterByCountryFailed implements Action {
  readonly type = SponsorsActionType.FILTER_BY_COUNTRY_FAILED;

  constructor(public payload: string) {
  }
}

export class SortByCountry implements Action {
  readonly type = SponsorsActionType.SORT_BY_COUNTRY;

  constructor(public payload: string) {
  }
}

export class SortByCountrySuccess implements Action {
  readonly type = SponsorsActionType.SORT_BY_COUNTRY_SUCCESS;

  constructor(public payload: Array<Sponsor>) {
  }
}

export class SortByCountryFailed implements Action {
  readonly type = SponsorsActionType.SORT_BY_COUNTRY_FAILED;

  constructor(public payload: string) {
  }
}

export class AddSponsor implements Action {
  readonly type = SponsorsActionType.ADD_SPONSOR;

  constructor(public payload: Sponsor) {
  }
}

export class AddSponsorSuccess implements Action {
  readonly type = SponsorsActionType.ADD_SPONSOR_SUCCESS;

  constructor(public payload: Sponsor) {
  }
}

export class AddSponsorFailed implements Action {
  readonly type = SponsorsActionType.ADD_SPONSOR_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateSponsor implements Action {
  readonly type = SponsorsActionType.UPDATE_SPONSOR;

  constructor(public payload: Sponsor) {
  }
}

export class UpdateSponsorSuccess implements Action {
  readonly type = SponsorsActionType.UPDATE_SPONSOR_SUCCESS;

  constructor(public payload: Sponsor) {
  }
}

export class UpdateSponsorFailed implements Action {
  readonly type = SponsorsActionType.UPDATE_SPONSOR_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteSponsor implements Action {
  readonly type = SponsorsActionType.DELETE_SPONSOR;

  constructor(public payload: number) {
  }
}

export class DeleteSponsorSuccess implements Action {
  readonly type = SponsorsActionType.DELETE_SPONSOR_SUCCESS;

  constructor(public payload: number) {
  }
}

export class DeleteSponsorFailed implements Action {
  readonly type = SponsorsActionType.DELETE_SPONSOR_FAILED;

  constructor(public payload: string) {
  }
}

export type SponsorsActions =
  GetSponsors |
  GetSponsorsSuccess |
  GetSponsorsFailed |
  FilterByCountry |
  FilterByCountrySuccess |
  FilterByCountryFailed |
  SortByCountry |
  SortByCountrySuccess |
  SortByCountryFailed |
  AddSponsor |
  AddSponsorSuccess |
  AddSponsorFailed |
  UpdateSponsor |
  UpdateSponsorSuccess |
  UpdateSponsorFailed |
  DeleteSponsor |
  DeleteSponsorSuccess |
  DeleteSponsorFailed;
