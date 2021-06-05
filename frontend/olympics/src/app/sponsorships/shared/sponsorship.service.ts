import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Sponsorship} from './sponsorship.model';

@Injectable()
export class SponsorshipService {

  private sponsorshipsUrl = 'http://localhost:8080/api/sponsorships';

  constructor(private httpClient: HttpClient) {
  }

  getSponsorships(): Observable<Sponsorship[]> {
    return this.httpClient
      .get<Sponsorship[]>(this.sponsorshipsUrl);
  }

  deleteSponsorship(sponsorshipId: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.sponsorshipsUrl + '/' + sponsorshipId);
  }

  updateSponsorship(sponsorship: Sponsorship): Observable<any> {
    return this.httpClient
      .put<any>(this.sponsorshipsUrl, sponsorship);
  }

  addSponsorship(sponsorship: Sponsorship): Observable<any> {
    return this.httpClient
      .post<any>(this.sponsorshipsUrl, sponsorship);
  }

  getSponsorshipsByMoneyContribution(filterValue: string): Observable<Sponsorship[]> {
    if (filterValue.length === 0) {
      filterValue = '0';
    }

    return this.httpClient
      .get<Sponsorship[]>(this.sponsorshipsUrl + '/moneyContribution?' + 'moneyContribution=' + filterValue);
  }

}
