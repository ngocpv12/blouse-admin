import { HospitalService } from './../../../Services/hospital.service';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-hospital',
  templateUrl: './dialog-hospital.component.html',
  styleUrls: ['./dialog-hospital.component.css']
})
export class DialogHospitalComponent implements OnInit {

  get id(){
    return this.addForm.get('id');
  }
  get name(){
    return this.addForm.get('name');
  }
  // get title form control
  get address(){
    return this.addForm.get('address');
  }
  // get specialist form control
  get phoneNumber(){
    return this.addForm.get('phoneNumber');
  }
  // get unit form control
  get website(){
    return this.addForm.get('website');
  }

  get email(){
    return this.addForm.get('email');
  }

  get description(){
    return this.addForm.get('description');
  }

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              private fb: FormBuilder, 
              private _hospitalService: HospitalService) { }

  ngOnInit() {
  }
  
  addForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    address: ['',Validators.required],
    phoneNumber: ['',Validators.required],
    website: ['', Validators.required],
    email: ['', Validators.required],
    description: ['', Validators.required]
  });


  // Function: submit data to server

  onSubmit(id) {
    if (id === undefined) {
      this._hospitalService.createHospital(this.addForm.value)
        .subscribe(
          response => console.log('Success!', response),
          error => console.error('Error!', error)
        );
    }
    else {
      this._hospitalService.updateHospital(this.addForm.value)
      .subscribe(
        response => console.log('Success!', response),
        error => console.error('Error!', error)
      ); 
    }
  }

}
