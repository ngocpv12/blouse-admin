import { DoctorService } from './../../../Services/doctor.service';
import { MedicalExaminationService } from './../../../Services/medical-examination.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-medical-examination',
  templateUrl: './dialog-medical-examination.component.html',
  styleUrls: ['./dialog-medical-examination.component.css']
})
export class DialogMedicalExaminationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogMedicalExaminationComponent>,
    private _examinationService: MedicalExaminationService,
    private _doctorService: DoctorService,
  ) { }

  ngOnInit(): void {
    this.loadDoctor(this.data.department)
  }

  doctors;
  formData = this.fb.group({
    id: ['', Validators.required],
    patientId: ['', Validators.required],
    departmentId: ['', Validators.required],
    doctorId: ['', Validators.required],
    appointmentTime: ['', Validators.required],
    place: ['', Validators.required]
  });

  get id() {
    return this.formData.get('id');
  }

  get patientId() {
    return this.formData.get('patientId');
  }

  get patient() {
    return this.formData.get('patient');
  }

  get departmentId() {
    return this.formData.get('departmentId');
  }

  get department() {
    return this.formData.get('department');
  }

  get doctorId() {
    return this.formData.get('doctorId');
  }

  get appointmentTime() {
    return this.formData.get('appointmentTime');
  }

  get place() {
    return this.formData.get('place');
  }

  onSubmit = (id) => {
    if (id === undefined) {
      console.log("Can't add examination this way!");
      }
    else {
      console.log('update', id);
      
      let dateToFormat = new Date(this.formData.value.appointmentTime);
      this.formData.value.appointmentTime = dateToFormat.toISOString().slice(0,10);
      
      this._examinationService.confirmExamination(this.formData.value)
      .subscribe(
        response => {
          console.log('Success!', response);
        },
        error => console.error('Error!', error)
      ); 
    }
    this.dialogRef.close('submitted');
  }

  loadDoctor = (dept) => {
    let hosId = dept.hospital.id;
    let depId = dept.id;

    this._doctorService.getDoctorByFilter(hosId, depId, null)
      .subscribe(
        response => {
          this.doctors = response;
          this.doctors = this.doctors.data;
        },
        error => console.error('Error!', error))
  }
}
