import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDoctor } from '../Entity/doctor';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private _http: HttpClient) { }
  _url = environment.SERVER_URL + 'doctor';

  getAllDoctors(page: number = null,size: number = null): Observable<IDoctor[]> {
    let getUrl = this._url+"?";
    if(page != null){
      getUrl = getUrl + "page=" + page + "&";
    }
    if(size != null){
      getUrl = getUrl + "size=" + size +"&";
    }
    return this._http.get<IDoctor[]>(getUrl)
      .pipe(catchError(this.errorHandler));
  }


  getDoctorById(id: number): Observable<IDoctor[]> {
    return this._http.get<IDoctor[]>(this._url + '/' + id)
      .pipe(catchError(this.errorHandler));
  }

  addDoctor(userData) {
    return this._http.post<any>(this._url, userData)
      .pipe(catchError(this.errorHandler));
  }

  deleteDoctor(id: number) {
    return this._http.delete<any>(this._url + '/' + id);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  updateDoctor(userData) {
    return this._http.put<any>(this._url, userData);
  }

  setActive(id) {
    return this._http.put<any>(this._url + "/setActive/" + id ,id);
  }

  // Get doc tor by hospital department or doctor name
  getDoctorByFilter(hospitalId: number, departmentId: number, txtSearch: string): Observable<IDoctor[]> {
    let searchUrl = this._url+'/search?';
    if(hospitalId != null){
      searchUrl = searchUrl + 'hospitalId=' + hospitalId + '&';
    }
    if(departmentId != null){
      searchUrl = searchUrl + 'departmentId=' + departmentId + '&'; 
    }
    if(txtSearch != null){
      searchUrl = searchUrl + 'txtSearch=' + txtSearch + '&';
    }
    
    return this._http.get<IDoctor[]>(searchUrl)
      .pipe(catchError(this.errorHandler));
  }

    // // Get doc tor by hospital department or doctor name
    // getDoctorByFilter(txtSearch): Observable<IDoctor[]> {
    //   return this._http.get<IDoctor[]>(this._url + "/search" + '/' + txtSearch)
    //     .pipe(catchError(this.errorHandler));
    // }
}