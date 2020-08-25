import { IMedicalExamination } from './../../Entity/medical-examination';
import { MatDialog } from '@angular/material/dialog';
import { MedicalExaminationService } from './../../Services/medical-examination.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogMedicalExaminationComponent } from '../general-components/dialog-medical-examination/dialog-medical-examination.component';

@Component({
  selector: 'app-medical-examination',
  templateUrl: './medical-examination.component.html',
  styleUrls: ['./medical-examination.component.css']
})
export class MedicalExaminationComponent implements OnInit {

  dataSource;
  searchText;
  patientId;
  notFound;
  noExaminations: boolean;
  constructor(
    private _examinationService: MedicalExaminationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void {
    this.noExaminations = false;
    this._route.paramMap.subscribe((params: ParamMap) => {
      let patientId = params.get('p');
      this.patientId = patientId;
    });
    this.loadDataTable();
  }

  displayedColumns: string[] = [    
    'index',
    'id',
    'patient',
    'department',
    'doctor',
    'status',
    'appointmentTime',
    'place',
    'isActive',
    'action'
  ];

  loadDataTable = () => {
    console.log("I am loading dataTable");
    if (this.patientId) {
      this._examinationService.getExaminationByFilter(this.patientId, null)
      .subscribe(response => {
        this.dataSource = response;
        this.dataSource = this.dataSource.data;
        this.dataSource = new MatTableDataSource(this.dataSource);
        console.log(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
        this.noExaminations = true;
      });
    }
    else {
      this._examinationService.getAllExaminations()
      .subscribe(response => {
        this.dataSource = response;
        this.dataSource = this.dataSource.data;
        this.dataSource = new MatTableDataSource(this.dataSource);
        console.log(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  searchPayment = (txtSearch) => {
    console.log("Executing search Patient");
    // CONTINUE HERE
    this._examinationService.getExaminationByFilter(null, txtSearch)
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

  openDialog() {
    let dialogRef = this._dialog.open(DialogMedicalExaminationComponent, {
      data: { type: 'edit' }
    });
    // dialogRef.updateSize("400px","500px");
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadDataTable();
    });
  }

  editDepartment(examination: IMedicalExamination) {
    let dialogRef = this._dialog.open(DialogMedicalExaminationComponent, {
      data: {
        type: 'edit',
        id: examination.id,
        patient: examination.patient,
        patientId: examination.patient.id,
        doctor: examination.doctor,
        doctorId: examination.doctor.id,
        department: examination.doctor.department,
        departmentId: examination.doctor.department.id,
        status: examination.status,
        appointmentTime: examination.appointment.appointmentTime,
        place: examination.appointment.place,
        isActive: examination.isActive,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      setTimeout(() => this.loadDataTable(),
      3000);
    },
      error => console.log('Update Fail', error)
    );
  }

  // Function: set active on off
  setActive = (id) => {
    this._examinationService.setActive(id)
      .subscribe(response => {
        console.log("Set active successful!");
      });
  }

  reloadPage = () => {
    this._router.navigate(["/payments"]);
    this.patientId = null;
    this.noExaminations = false;
    this.loadDataTable();
  }
}
