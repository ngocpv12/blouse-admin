import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IPayment } from './../Entity/payment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http: HttpClient) { }
  _url = environment.SERVER_URL + 'payment';

  getAllPayments(): Observable<IPayment[]> {
    return this._http.get<IPayment[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
  
  //p = patientId, q = searchQuery
  getPaymentByFilter(p: string, q: string): Observable<IPayment[]> {
    let searchUrl = this._url + '?';

    if (p) {
      searchUrl = searchUrl + 'p=' + p;
    }
    if (q != null) {
      searchUrl = searchUrl + 'q=' + q;
    }

    return this._http.get<IPayment[]>(searchUrl)
      .pipe(catchError(this.errorHandler));
  }

  setActive(id) {
    return this._http.put<any>(this._url + "/setActive/" + id, id);
  }
}
