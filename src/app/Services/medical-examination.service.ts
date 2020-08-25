import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IMedicalExamination } from './../Entity/medical-examination';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicalExaminationService {

  constructor(
    private _http: HttpClient
  ) { }
  _url = environment.SERVER_URL + 'medical-examination';

  getAllExaminations(): Observable<IMedicalExamination[]> {
    return this._http.get<IMedicalExamination[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
  
  //p = patientId, q = searchQuery
  getExaminationByFilter(p: string, q: string): Observable<IMedicalExamination[]> {
    let searchUrl = this._url + '?';

    if (p) {
      searchUrl = searchUrl + 'p=' + p;
    }
    if (q != null) {
      searchUrl = searchUrl + 'q=' + q;
    }

    return this._http.get<IMedicalExamination[]>(searchUrl)
      .pipe(catchError(this.errorHandler));
  }

  setActive(id) {
    return this._http.put<any>(this._url + "/setActive/" + id ,id);
  }

  confirmExamination(userData) {
    return this._http.put<any>(this._url + '/confirm', userData)
      .pipe(catchError(this.errorHandler));
  }
}
