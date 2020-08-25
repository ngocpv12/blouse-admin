import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDepartment } from '../Entity/department';
import { catchError } from 'rxjs/operators';
import config from 'src/config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _http: HttpClient) {}
  _url = environment.SERVER_URL + 'department';

  getDepartmentByHosId(id: number): Observable<IDepartment[]>{
    return this._http.get<IDepartment[]>(this._url+"/department-name-by-hospital" + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  getDepartmentById(id: number): Observable<IDepartment[]>{
    return this._http.get<IDepartment[]>(this._url+ '/' + id)
    .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
  addDepartment(userData) {
    return this._http.post<any>(this._url, userData)
      .pipe(catchError(this.errorHandler));
  }
  getAllDepartments(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }
   // Get doc tor by hospital department or doctor name
   getDepartmentByFilter(hospitalId:number,txtSearch: string): Observable<IDepartment[]> {
    let searchUrl = this._url + '/search?';

    if(hospitalId != null){
      searchUrl = searchUrl + 'hospitalId=' + hospitalId + '&';
    }
    if (txtSearch != null) {
      searchUrl = searchUrl + 'txtSearch=' + txtSearch + '&';
    }

    return this._http.get<IDepartment[]>(searchUrl)
      .pipe(catchError(this.errorHandler));
  }

  
  updateDepartment(userData) {
    return this._http.put<any>(this._url, userData);
  }

  setActive(id) {
    return this._http.put<any>(this._url + "/setActive/" + id ,'');
  }
}
