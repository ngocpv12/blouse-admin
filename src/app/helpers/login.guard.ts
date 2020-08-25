import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _authService: AuthenticationService, 
    private _router: Router){}

  canActivate(): boolean{
    if(this._authService.loggedIn()){
      this._router.navigate(['/doctors']);
      return false;
    }else{
      
      return true;
    }
  }
  
 
}
