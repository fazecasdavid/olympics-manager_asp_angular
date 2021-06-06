import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Juror} from './juror.model';

@Injectable()
export class JurorService {

  private jurorsUrl = 'https://localhost:44397/api/Juror';

  constructor(private httpClient: HttpClient) {
  }

  getJurors(): Observable<Juror[]> {
    return this.httpClient
      .get<Juror[]>(this.jurorsUrl);
  }

  deleteJuror(jurorId: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.jurorsUrl + '/' + jurorId);
  }

  updateJuror(juror: Juror): Observable<any> {
    return this.httpClient
      .put<any>(this.jurorsUrl, juror);
  }

  addJuror(juror: Juror): Observable<any> {
    return this.httpClient
      .post<any>(this.jurorsUrl, juror);
  }

  getJurorsByCountry(filterValue: string): Observable<Juror[]> {
    return this.httpClient
      .get<Juror[]>(this.jurorsUrl + '/country?' + 'country=' + filterValue);
  }

  getJurorsByFirstName(filterValue: string): Observable<Juror[]> {
    return this.httpClient
      .get<Juror[]>(this.jurorsUrl + '/firstName?' + 'firstName=' + filterValue);
  }

}
