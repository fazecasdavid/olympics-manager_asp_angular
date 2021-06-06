import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Participation} from './participation.model';

@Injectable()
export class ParticipationService {

  private participationsUrl = 'http://localhost:8080/api/participations';

  constructor(private httpClient: HttpClient) {
  }

  getParticipations(): Observable<Participation[]> {
    return this.httpClient
      .get<Participation[]>(this.participationsUrl);
  }

  deleteParticipation(participationId: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.participationsUrl + '/' + participationId);
  }

  updateParticipation(participation: Participation): Observable<any> {
    return this.httpClient
      .put<any>(this.participationsUrl, participation);
  }

  addParticipation(participation: Participation): Observable<any> {
    return this.httpClient
      .post<any>(this.participationsUrl, participation);
  }

  getParticipationsByCountry(filterValue: string): Observable<Participation[]> {
    return this.httpClient
      .get<Participation[]>(this.participationsUrl + '/country?' + 'country=' + filterValue);
  }

}
