import { HospitalService } from './../../../Services/hospital.service';
import { StaffService } from './../../../Services/staff.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-staff',
  templateUrl: './dialog-staff.component.html',
  styleUrls: ['./dialog-staff.component.css']
})
export class DialogStaffComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _staffService: StaffService,
    private _hospitalService: HospitalService,
    public dialogRef: MatDialogRef<DialogStaffComponent>
  ) { }

  ngOnInit(): void {
    this.loadHospitals();
  }

  hospitals;
  addForm = this.fb.group({
    hospital: ['', Validators.required],
    isActive: ['', Validators.required],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    title: ['',Validators.required],
    gender: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required]
  });

  get hospital() {
    return this.addForm.get('hospital');
  }
  
  get isActive() {
    return this.addForm.get('isActive');
  }
  
  get fullName() {
    return this.addForm.get('fullName');
  }
  
  get title() {
    return this.addForm.get('title');
  }
  
  get gender() {
    return this.addForm.get('gender');
  }
  
  get phoneNumber() {
    return this.addForm.get('phoneNumber');
  }
  
  get dateOfBirth() {
    return this.addForm.get('dateOfBirth');
  }
  
  get address() {
    return this.addForm.get('address');
  }
  
  get email() {
    return this.addForm.get('email');
  }
  
  get username() {
    return this.addForm.get('username');
  }

  onSubmit(id) {
    if (id === undefined) {
      this._staffService.addStaff(this.addForm.value)
        .subscribe(
          response => console.log('Success!', response),
          error => console.error('Error!', error)
        );
    }
    else {
      console.log('update',id);
      this._staffService.updateStaff(id, this.addForm.value)
      .subscribe(
        response => console.log('Success!', response),
        error => console.error('Error!', error)
      ); 
    }
    this.dialogRef.close('submitted');
  }

  loadHospitals() {
    this._hospitalService.getAllHospital()
      .subscribe(
        response => {
          this.hospitals = response;
          this.hospitals = this.hospitals.data;
        },
        error => console.error('Error!', error)
      )
  }
}
