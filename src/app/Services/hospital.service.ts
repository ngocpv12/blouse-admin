import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IHospital } from './../Entity/hospital';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { identifierName } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private _http: HttpClient) { }
  _url = environment.SERVER_URL + 'hospital';

  getAllHospital(): Observable<IHospital[]> {
    return this._http.get<IHospital[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }
  getHospitalById(id: number): Observable<IHospital[]> {
    return this._http.get<IHospital[]>(this._url + '/' + id)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  createHospital(userData) {
    return this._http.post<any>(this._url, userData)
      .pipe(catchError(this.errorHandler));
  }


  updateHospital(userData){
    return this._http.put<any>(this._url,userData);
  }

  // Get doc tor by hospital department or doctor name
  getHospitalByFilter(txtSearch: string): Observable<IHospital[]> {
    let searchUrl = this._url + '/search?';

    if (txtSearch != null) {
      searchUrl = searchUrl + 'txtSearch=' + txtSearch + '&';
    }

    return this._http.get<IHospital[]>(searchUrl)
      .pipe(catchError(this.errorHandler));
  }
  setActive(id) {
    return this._http.put<any>(this._url + "/setActive/" + id, identifierName);
  }
}
