import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFailMessage;
  usernameInput;
  passwordInput;
  public displayHeader: boolean;
  get getDisplayHeader(): boolean {
    return this.displayHeader;
  }
  constructor(
    private _authenService: AuthenticationService,
    private fb: FormBuilder,
    private _router: Router, 
    private _cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }
  get username() {
    return this.addForm.get('username');
  }
  get password() {
    return this.addForm.get('password');
  }
  addForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {   
    this._authenService.login(this.addForm.value)
    .subscribe(response => {      
      const token = response.headers.get('access_token');
      this._cookieService.set('access_token', token, 60 * 60 * 1000);      
      const tokenPayload = decode(token);
      
      if(tokenPayload.role !== "ADMIN" && tokenPayload.role !== "STAFF"){

        this._cookieService.delete('access_token')
        this.loginFailMessage = "Bạn không có quyền truy cập vào admin system!";
        this._router.navigate(["/login"]);
      }else{
        console.log("Login successfully");
        this.loginFailMessage = '';
        
        window.location.href = "doctors";
      }

    },
      error => {

        console.log("login fail", error);
        this.loginFailMessage = 'Tài khoản hoặc mật khẩu không chính xác';
      });
    

  }
}
