import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-medical-record',
  templateUrl: './dialog-medical-record.component.html',
  styleUrls: ['./dialog-medical-record.component.css']
})
export class DialogMedicalRecordComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
