import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStaff } from '../Entity/staff';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  _url = environment.SERVER_URL + 'staff';

  constructor(
    private _http: HttpClient,
    private fb: FormBuilder
  ) { }

  getAllStaff(): Observable<IStaff[]>{
    return this._http.get<IStaff[]>(this._url)
                    .pipe(catchError(this.errorHandler));
  }

  addStaff(userData){
    return this._http.post<any>(this._url, userData)
                     .pipe(catchError(this.errorHandler));
  }

  updateStaff(id, userData){
    return this._http.put<any>(this._url + '/' + id, userData);
  }

  deleteStaff(id: number){
    return this._http.delete<any>(this._url + '/' + id);
  }
  
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }

  // Get doc tor by hospital department or doctor name
  getStaffByFilter(txtSearch: string): Observable<IStaff[]> {
    let searchUrl = this._url + '/search?';

    if (txtSearch != null) {
      searchUrl = searchUrl + 'txtSearch=' + txtSearch + '&';
    }

    return this._http.get<IStaff[]>(searchUrl)
      .pipe(catchError(this.errorHandler));
  }
  setActive(id) {
    return this._http.put<any>(this._url + "/setActive/" + id ,id);
  }
}
