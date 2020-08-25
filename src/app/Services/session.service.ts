import { Injectable } from '@angular/core';
import { IMedicalRecord } from '../Entity/medical-record';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  loginStatus: boolean = false;

  getLoginStatus(): boolean{
    return this.loginStatus;
  }
  saveLoginStatus(status: boolean){
    this.loginStatus = status;
  }
  deleteLoginStatus(){
    this.loginStatus = false;
  }
}
