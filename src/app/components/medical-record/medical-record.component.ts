import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from 'src/app/Services/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { MedicalRecordService } from 'src/app/Services/medical-record.service';
import { IMedicalRecord } from 'src/app/Entity/medical-record';
import { Router, NavigationExtras } from '@angular/router';
import { SessionService } from 'src/app/Services/session.service';
import { DialogMedicalRecordComponent } from '../general-components/dialog-medical-record/dialog-medical-record.component';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {

  colorSlide = "primary";
  //not found variable
  notFound;
  searchText;
  dataSource;
  hospitals;
  departmentsByHosId;
  departmentById;
  hospitalId: number;
  hospitalById;
  selectedHospital;
  selectedDepartment;
  public errorMsg;
  constructor(
    private _dialog: MatDialog,
    private _medicalRecord: MedicalRecordService,
    private _router: Router
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void {
    this.loadDataTable();
  }
  displayedColumns: string[] = [
    'index', 
    'id', 
    'patientName',
    'pathology', 
    'treatment', 
    'description', 
    'isActive',
    'actions'
  ];

  loadDataTable() {
    console.log("I am loading dataTable");
    this._medicalRecord.getAllMedicalRecords()
      .subscribe(response => {
        this.dataSource = response;
        this.dataSource = this.dataSource.data;
        this.dataSource = new MatTableDataSource(this.dataSource);
        console.log(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  // function search doctor
  searchMedicalRecord(txtSearch: string) {
    console.log("Executing search Medical Record");
    // CONTINUE HERE
    this._medicalRecord.getMedicalRecordByFilter(txtSearch)
      .subscribe(response => {
        this.dataSource = response;
        console.log(this.dataSource);
        this.dataSource = this.dataSource.data;
        console.log(this.dataSource);
        this.dataSource = new MatTableDataSource(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.notFound = '';
      },
        error => {
          console.log("error -------------", error);
          this.notFound = "Khong tim thay";
          this.dataSource = "";
        }
      );
  }


  // Function: set active on off
  setActive(id) {
    this._medicalRecord.setActive(id)
      .subscribe(response => {
        console.log("Set active successful!");
      });
  }
  openDialog(medicalRecord: IMedicalRecord) {
    this._dialog.open(DialogMedicalRecordComponent, {
      data: {
        medicalRecordId: medicalRecord.id,
        patientName: medicalRecord.medicalExamination.patient.user.fullName,
        doctorName: medicalRecord.medicalExamination.doctor.user.fullName,
        description: medicalRecord.description,
        pathology: medicalRecord.pathology,
        treatment: medicalRecord.treatment  
      }
    });
  }
}
