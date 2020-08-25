import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private _authService: AuthenticationService, 
    private _router: Router, private _cookieService: CookieService){}

  canActivate(): boolean{

    const token = this._cookieService.get('access_token');

    const tokenPayload = decode(token);
    if (
      !this._authService.loggedIn() || 
      tokenPayload.role != "ADMIN"
    ) {
      console.log("Ban deoo co quyen vao day!");
      return false;
    }
    return true;
  }
  
}
