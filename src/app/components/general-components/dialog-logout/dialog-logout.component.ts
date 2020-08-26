import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.css']
})
export class DialogLogoutComponent implements OnInit {

  constructor(
    private _auth: AuthenticationService,
    private _router: Router

  ) { }

  ngOnInit(): void {
  }
  logout(){
    this._auth.logout();
    console.log("Log out successfully!");
    window.location.href = "login";
  }
}
