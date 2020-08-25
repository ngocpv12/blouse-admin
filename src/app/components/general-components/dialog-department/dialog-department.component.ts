import { Component, OnInit, Inject, Input, Output,EventEmitter} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DepartmentComponent } from '../../department/department.component';
import { DepartmentService } from 'src/app/Services/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HospitalService } from 'src/app/Services/hospital.service';
import { DialogStaffComponent } from '../dialog-staff/dialog-staff.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-department',
  templateUrl: './dialog-department.component.html',
  styleUrls: ['./dialog-department.component.css']
})
export class DialogDepartmentComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _departmentService: DepartmentService,
    private _hospitalService: HospitalService,
    public dialogRef: MatDialogRef<DialogDepartmentComponent>
  ) { }

  ngOnInit(): void {
    this.loadHospitals();
  }

  hospitals;
  addForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    address: ['', [Validators.required]],
    phoneNumber: ['', Validators.required],
    website: ['', Validators.required],
    email: ['', Validators.required],
    description: ['', Validators.required],
    hospitalId: ['', Validators.required]
  });

  get id() {
    return this.addForm.get('id');
  }

  get isActive() {
    return this.addForm.get('isActive');
  }

  get name() {
    return this.addForm.get('name');
  }

  get phoneNumber() {
    return this.addForm.get('phoneNumber');
  }

  get website() {
    return this.addForm.get('website');
  }
  get hospitalId() {
    return this.addForm.get('hospitalId');
  }

  get address() {
    return this.addForm.get('address');
  }

  get email() {
    return this.addForm.get('email');
  }

  get description() {
    return this.addForm.get('description');
  }

  onSubmit(id) {
    if (id === undefined) {
      this._departmentService.addDepartment(this.addForm.value)
        .subscribe(
          response => {
            console.log('Success!', response);
            console.log("Data source sau khi add");
          },
          error => console.error('Error!', error)
        );
    }
    else {
      console.log('update', id);
      this._departmentService.updateDepartment(this.addForm.value)
        .subscribe(
          response => console.log('Success!', response),
          error => console.error('Error!', error)
        );
    }
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
