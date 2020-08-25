import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private _auth: AuthenticationService, 
    private route: ActivatedRoute,
    private _router: Router,
    private _cookieService: CookieService,
    public dialog: MatDialog
    ) { }
  role = "STAFF";
  loginStatus:boolean = this._cookieService.check('access_token') ? true : false;
  currentUrl;
  currentIndex;

  ngOnInit(): void {
    this.loginStatus = this._cookieService.check('access_token') ? true : false;
    console.log(this._router.url);
    this.route.paramMap.subscribe((params: ParamMap) => {
      let currentIndex = params.get('currentIndex');
      this.currentIndex = currentIndex;
      console.log(currentIndex);
      
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogLogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  login(){
    this.navigateLink("login");
  }

  navigateLink(link: string){
    this._router.navigate(["/"+link+""]);
    console.log("Current Index la" + this.currentIndex);
    
  }
  showDoctor(){
    this.currentIndex = "doctors";
    this.navigateLink("doctors");
    console.log("What is this router");
    console.log(this._router.url);
    
  }
  showPatient(){
    this.currentIndex = "patients";
    this.navigateLink("patients");  
  }
  showDepartment(){
    this.currentIndex = "department";
    this.navigateLink("department");
    
  }
  showHospital(){
    this.currentIndex = "hospital";
    this.navigateLink("hospitals");
    
  }
  showStaff(){
    this.currentIndex = "staffs";
    this.navigateLink("staffs");
    
  }
  showMedicalRecord(){
    this.currentIndex = "medical-records";
    this.navigateLink("medical-records");
    
  }
  showExamination(){
    this.currentIndex = "medical-examination";
    this.navigateLink("medical-examination");
    
  }
  showPayment(){
    this.currentIndex = "payments";
    this.navigateLink("payments");
    
  }
}
