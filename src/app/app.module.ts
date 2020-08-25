import { DepartmentService } from './Services/department.service';
import { StaffService } from './Services/staff.service';
import { HospitalService } from 'src/app/Services/hospital.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppComponent } from './components/root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogDoctorComponent } from './components/general-components/dialog-doctor/dialog-doctor.component';
import { MaterialModule } from './Material/material/material.module';

import { HeaderComponent } from './components/general-components/header/header.component';
import { DoctorService } from './Services/doctor.service';
import { routingComponents, AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HospitalComponent } from './components/hospital/hospital.component';
import { DialogHospitalComponent } from './components/general-components/dialog-hospital/dialog-hospital.component';
import { DialogStaffComponent } from './components/general-components/dialog-staff/dialog-staff.component';
import { DialogDepartmentComponent } from './components/general-components/dialog-department/dialog-department.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import { MedicalExaminationComponent } from './components/medical-examination/medical-examination.component';
import { DialogMedicalExaminationComponent } from './components/general-components/dialog-medical-examination/dialog-medical-examination.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogLogoutComponent } from './components/general-components/dialog-logout/dialog-logout.component';
import { DialogMedicalRecordComponent } from './components/general-components/dialog-medical-record/dialog-medical-record.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DialogDoctorComponent,
    HeaderComponent,
    HospitalComponent,
    DialogHospitalComponent,
    DialogStaffComponent,
    DialogDepartmentComponent,
    LoginComponent,
    MedicalExaminationComponent,
    DialogMedicalExaminationComponent,
    DialogLogoutComponent,
    DialogMedicalRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTooltipModule
  ],
  entryComponents: [
    DialogDoctorComponent,
    DialogStaffComponent,
    DialogLogoutComponent,
    DialogDepartmentComponent,
    DialogHospitalComponent,
    DialogMedicalExaminationComponent,
    DialogMedicalRecordComponent
  ],
  providers: [
    DoctorService,
    StaffService,
    HospitalService,
    DepartmentService,
    AuthGuard,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
