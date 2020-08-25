import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LoginComponent } from '../login/login.component';
import { SessionService } from 'src/app/Services/session.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client-Admin';
  loginStatus: boolean = false;
  constructor(
    private _cookieService: CookieService
  ) { }

  ngOnInit(): void { 
    this.loginStatus = this._cookieService.check('access_token') ? true : false;
  }

}
