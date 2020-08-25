import { MedicalExaminationComponent } from './../components/medical-examination/medical-examination.component';
import { DepartmentComponent } from './../components/department/department.component';
import { HospitalComponent } from './../components/hospital/hospital.component';
import { StaffComponent } from './../components/staff/staff.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from '../components/doctor/doctor.component';
import { PageNotFoundComponent } from '../components/general-components/page-not-found/page-not-found.component';
import { PatientComponent } from '../components/patient/patient.component';
import { MedicalRecordComponent } from '../components/medical-record/medical-record.component';
import { PaymentComponent } from '../components/payment/payment.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../helpers/auth.guard';
import { LoginGuard } from '../helpers/login.guard';
import { RoleGuard } from '../helpers/role.guard';


const routes: Routes = [
  { 
    path:'', 
    redirectTo: '/doctors', 
    pathMatch:'full'
  },
  { 
    path:'doctors',
    component: DoctorComponent,
    canActivate: [AuthGuard]

  },
  { 
    path:'hospitals',
    component: HospitalComponent,
    canActivate: [RoleGuard] 
  },
  { 
    path:'department',
    component: DepartmentComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'staffs',
    component: StaffComponent,
    canActivate: [RoleGuard]  
  },
  {
    path:'patients',
    component: PatientComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'medical-records',
    component: MedicalRecordComponent,
    canActivate: [AuthGuard] 
  },
 
  {
    path:'medical-examination',
    component: MedicalExaminationComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'payments',
    component: PaymentComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  { 
    path:'**',
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  DoctorComponent,
  HospitalComponent,
  StaffComponent,
  DepartmentComponent,
  PatientComponent,
  MedicalRecordComponent,
  PaymentComponent,
  PageNotFoundComponent
];
