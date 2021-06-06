import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Sponsor} from './sponsor.model';

@Injectable()
export class SponsorService {

  private sponsorsUrl = 'https://localhost:44397/api/Sponsor';

  constructor(private httpClient: HttpClient) {
  }

  getSponsors(): Observable<Sponsor[]> {
    return this.httpClient
      .get<Sponsor[]>(this.sponsorsUrl);
  }

  deleteSponsor(sponsorId: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.sponsorsUrl + '/' + sponsorId);
  }

  updateSponsor(sponsor: Sponsor): Observable<any> {
    return this.httpClient
      .put<any>(this.sponsorsUrl, sponsor);
  }

  addSponsor(sponsor: Sponsor): Observable<any> {
    return this.httpClient
      .post<any>(this.sponsorsUrl, sponsor);
  }

  getSponsorsByCountry(filterValue: string): Observable<Sponsor[]> {
    return this.httpClient
      .get<Sponsor[]>(this.sponsorsUrl + '/country?' + 'country=' + filterValue);
  }

  getSponsorsSortedByCountry(direction: string): Observable<Sponsor[]> {
    return this.httpClient
      .get<Sponsor[]>(this.sponsorsUrl + '/sortByCountry?' + 'direction=' + direction);
  }
}
