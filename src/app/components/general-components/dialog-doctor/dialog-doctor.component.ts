import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DoctorService } from 'src/app/Services/doctor.service';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';
import { HospitalService } from 'src/app/Services/hospital.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-dialog-doctor',
  templateUrl: './dialog-doctor.component.html',
  styleUrls: ['./dialog-doctor.component.css']
})
export class DialogDoctorComponent implements OnInit {
  selected;
  selectedHospital = "1";
  selectedDepartment;
  // list hospital
  hospitals;
  //list Department
  departmentsByHosId;

  // get form control id
  get id() {
    return this.addForm.get('id');
  }
  // get form control name
  get username() {
    return this.addForm.get('username');
  }
  // get form control name
  get fullName() {
    return this.addForm.get('fullName');
  }
  // get form control gender
  get gender() {
    return this.addForm.get('gender');
  }
  // get title form control
  get title() {
    return this.addForm.get('title');
  }
  // get email form control
  get email() {
    return this.addForm.get('email');
  }
  // get address form control
  get address() {
    return this.addForm.get('address');
  }
  // get department form control
  get departmentId() {
    return this.addForm.get('departmentId');
  }
  // get department form control
  get hospital() {
    return this.addForm.get('hospital');
  }
  // get phone form control
  get phoneNumber() {
    return this.addForm.get('phoneNumber');
  }
  // get dob form control
  get dateOfBirth() {
    return this.addForm.get('dateOfBirth');
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _doctorService: DoctorService,
    private _hospitalService: HospitalService,
    private _departmentService: DepartmentService) { }

  ngOnInit() {
    this.loadHospitalInfo();

  }

  addForm = this.fb.group({
    id: [''],
    username: ['', Validators.required],
    fullName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    title: ['', Validators.required],
    hospital: ['', Validators.required],
    departmentId: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });


  // load all hospital
  loadHospitalInfo() {
    console.log("I am loading hospitalInfo");
    this._hospitalService.getAllHospital()
      .subscribe(response => {
        this.hospitals = response;
        this.hospitals = this.hospitals.data;
        console.log(this.hospitals);
      });
  }
  // load all department by id
  loadDepartmentByHosId(id) {
    console.log("Loading department with hospital id:" + id.value);
    this._departmentService.getDepartmentByHosId(id.value)
      .subscribe(response => {
        this.departmentsByHosId = response;
        console.log("List department by id" + id.value + "----------------");
        console.log(this.departmentsByHosId);
      });
  }



  // Function: submit data to server

  onSubmit(id) {
    if (id === undefined) {
      this._doctorService.addDoctor(this.addForm.value)
        .subscribe(
          response => console.log('Success!', response),
          error => console.error('Error!', error)
        );

    } else {
      console.log('update', id);
      this._doctorService.updateDoctor(this.addForm.value)
        .subscribe(
          response => console.log('Success!', response),
          error => console.error('Error!', error)
        );
    }
  }
}
