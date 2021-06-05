import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Competition} from './competition.model';

@Injectable()
export class CompetitionService {

  private competitionsUrl = 'http://localhost:8080/api/competitions';

  constructor(private httpClient: HttpClient) {
  }

  getCompetitions(): Observable<Competition[]> {
    return this.httpClient
      .get<Competition[]>(this.competitionsUrl);
  }

  deleteCompetition(competitionId: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.competitionsUrl + '/' + competitionId);
  }

  updateCompetition(competition: Competition): Observable<any> {
    return this.httpClient
      .put<any>(this.competitionsUrl, competition);
  }

  addCompetition(competition: Competition): Observable<any> {
    return this.httpClient
      .post<any>(this.competitionsUrl, competition);
  }

  getCompetitionsByLocation(filterValue: string): Observable<Competition[]> {
    return this.httpClient
      .get<Competition[]>(this.competitionsUrl + '/location?' + 'location=' + filterValue);
  }

  getCompetitionById(competitionId: number): Observable<Competition> {
    return this.httpClient
      .get<Competition>(this.competitionsUrl + '/' + competitionId);
  }

}
