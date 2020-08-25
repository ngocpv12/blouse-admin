import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IMedicalRecord } from '../Entity/medical-record';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  constructor(private _http: HttpClient) { }
  _url = environment.SERVER_URL + 'medical-record';

  getAllMedicalRecords(): Observable<IMedicalRecord[]> {
    return this._http.get<IMedicalRecord[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
  // Get doc tor by hospital department or doctor name
  getMedicalRecordByFilter(txtSearch: string): Observable<IMedicalRecord[]> {
    let searchUrl = this._url + '/search?';

    if (txtSearch != null) {
      searchUrl = searchUrl + 'txtSearch=' + txtSearch + '&';
    }

    return this._http.get<IMedicalRecord[]>(searchUrl)
      .pipe(catchError(this.errorHandler));
  }
  setActive(id) {
    return this._http.put<any>(this._url + "/setActive/" + id ,'');
  }

  addPatient(userData) {
    return this._http.post<any>(this._url+"/register", userData)
      .pipe(catchError(this.errorHandler));
  }

}