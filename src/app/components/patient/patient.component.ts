import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/Services/patient.service';
import { IPatient } from 'src/app/Entity/patient';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
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
    private _patientService: PatientService,
    private _router: Router
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void {
    this.loadDataTable();
  }
  displayedColumns: string[] = ['index', 'id','username','name', 'gender', 'dob', 'title', 'email', 'phone', 'isActive', 'action'];

  loadDataTable() {
    console.log("I am loading dataTable");
    this._patientService.getAllPatients()
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
  searchPatient(txtSearch: string) {
    console.log("Executing search Patient");
    // CONTINUE HERE
    this._patientService.getPatientByFilter(txtSearch)
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
    this._patientService.setActive(id)
      .subscribe(response => {
        console.log("Set active successful!");
      });
  } 

  viewExaminations = (patientId) => {
    this._router.navigate(["/medical-examination", { p: patientId, currentIndex: 'medical-examination' }]);
  }

  viewPayments = (patientId) => {
    this._router.navigate(["/payments", { p: patientId, currentIndex: 'payments' }]);
  }
}
