import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Athlete} from './athlete.model';

@Injectable()
export class AthleteService {

  private athletesUrl = 'https://localhost:44397/api/Athlete';

  constructor(private httpClient: HttpClient) {
  }

  getAthletes(): Observable<Athlete[]> {
    return this.httpClient
      .get<Athlete[]>(this.athletesUrl);
  }

  deleteAthlete(athleteId: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.athletesUrl + '/' + athleteId);
  }

  updateAthlete(athlete: Athlete): Observable<any> {
    return this.httpClient
      .put<any>(this.athletesUrl, athlete);
  }

  addAthlete(athlete: Athlete): Observable<any> {
    console.log(athlete.id);
    return this.httpClient
      .post<any>(this.athletesUrl, athlete);
  }

  getAthletesByCountry(filterValue: string): Observable<Athlete[]> {
    return this.httpClient
      .get<Athlete[]>(this.athletesUrl + '/country?' + 'country=' + filterValue);
  }

  getAthletesByFirstName(filterValue: string): Observable<Athlete[]> {
    return this.httpClient
      .get<Athlete[]>(this.athletesUrl + '/firstName?' + 'firstName=' + filterValue);
  }

}
