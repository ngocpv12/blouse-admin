import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPatient } from '../Entity/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private _http: HttpClient) { }
  _url = environment.SERVER_URL + 'patient';

  getAllPatients(): Observable<IPatient[]> {
    return this._http.get<IPatient[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
  // Get doc tor by hospital department or doctor name
  getPatientByFilter(txtSearch: string): Observable<IPatient[]> {
    let searchUrl = this._url + '/search?';

    if (txtSearch != null) {
      searchUrl = searchUrl + 'txtSearch=' + txtSearch + '&';
    }

    return this._http.get<IPatient[]>(searchUrl)
      .pipe(catchError(this.errorHandler));
  }
  setActive(id) {
    return this._http.put<any>(this._url + "/setActive/" + id ,id);
  }

  addPatient(userData) {
    return this._http.post<any>(this._url+"/register", userData)
      .pipe(catchError(this.errorHandler));
  }
}