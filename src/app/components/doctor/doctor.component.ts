import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDoctorComponent } from '../general-components/dialog-doctor/dialog-doctor.component';
import { IDoctor } from 'src/app/Entity/doctor';
import { DoctorService } from 'src/app/Services/doctor.service';
import { HospitalService } from 'src/app/Services/hospital.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { PageEvent } from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  @Input() length: number = 0;
  @Input() pageIndex: number = 1;
  @Input() pageSize: number = 5;
  @Output() page: EventEmitter<PageEvent>;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lowValue: number = 0;
  highValue: number = 50;
  // MatPaginator Output
  pageEvent: PageEvent;


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
    private dialog: MatDialog,
    private _doctorService: DoctorService,
    private _hospitalService: HospitalService,
    private _departmentService: DepartmentService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void {
    this.loadDataTable();
    this.loadHospitalInfo();
    
  }
  displayedColumns: string[] = ['index', 'id', 'name', 'gender', 'dob', 'title', 'departmentName', 'hospitalName', 'email', 'phone', 'actions', 'isActive'];

  loadDataTable() {
    console.log("I am loading dataTable");
    this._doctorService.getAllDoctors()
      .subscribe(response => {
        this.dataSource = response;
        this.dataSource = this.dataSource.data;
        console.log(this.dataSource);
        this.dataSource = new MatTableDataSource(this.dataSource);
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
        error => { console.log("Khong co data bac si: ", error) });
  }

  loadLength() {
    let temp;
    this._doctorService.getAllDoctors()
      .subscribe(response => {
        temp = response;
        this.length = temp.page.total_item;
        console.log("total:" + this.length);
      },
        error => { console.log("Khong co data bac si: ", error) });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // logData(row){
  //   console.log(row);
  // }

  openDialog() {
    // let dialogConfig = new MatDialogConfig();
    // dialogConfig.width = "50%";
    let dialogRef = this.dialog.open(DialogDoctorComponent, {
      data: { type: 'create' }
    });
    // dialogRef.updateSize("400px","500px");
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      setTimeout(() => {
        this.loadLength();
        console.log("Length after add" + this.length);
        this.loadDataTable();
      }, 3000);
    });
  }

  editDoctor(doctor: IDoctor) {
    // get department by id, get hospital id

    this._departmentService.getDepartmentById(doctor.departmentId)
      .subscribe(response => {
        this.departmentById = response;
        console.log("Data of department got by id-----");
        console.log(this.departmentById);
        this.hospitalId = this.departmentById.hospitalId;
        // get hospital by id
        this._hospitalService.getHospitalById(this.hospitalId)
          .subscribe(response => {
            this.hospitalById = response;
            console.log("Hospital got by id " + this.hospitalId);
            console.log(this.hospitalById);
            // open dialog
            let dialogRef = this.dialog.open(DialogDoctorComponent, {
              data: {
                type: 'edit', id: doctor.id, fullName: doctor.user.fullName, gender: doctor.user.gender, dateOfBirth: doctor.user.dateOfBirth,
                title: doctor.user.title, departmentId: this.departmentById.id, hospitalId: this.hospitalById.id, isActive: doctor.isActive, address: doctor.user.address,
                email: doctor.user.email, phoneNumber: doctor.user.phoneNumber
              }
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
              console.log(this.dataSource);
              setTimeout(() => {
                this.loadDataTable();
              }, 3000);
            },
              error => console.log('Update Fail', error)
            );
          });
      });
  }

  deleteDoctor(doctor: IDoctor): void {
    this._doctorService.deleteDoctor(doctor.id)
    .subscribe(
      response => {
        setTimeout(() => {
          this.loadDataTable();
        }, 3000);
        console.log('Success!', response)
      },
      error => console.error('Delete Fail!', error)
    );

  };

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
      .subscribe((response) => {
        this.departmentsByHosId = response;
        console.log("List department by id" + id + "----------------");
        console.log(this.departmentsByHosId);
      });
  }


  //get department by id
  // that bai vcl
  getDepartmentById(departmentId) {
    this._departmentService.getDepartmentById(departmentId)
      .subscribe(response => {
        this.departmentById = response;
        console.log("Data of department got by id-----");
        console.log(this.departmentById);
      });
  }
  // get hospital by id
  getHospitalById(hospitalId) {
    this._hospitalService.getHospitalById(hospitalId)
      .subscribe(response => {
        this.hospitalById = response;
        console.log("Hospital by id ----------");
        console.log(this.hospitalById);
      });
  }

  // function search doctor
  searchDoctor(hospitalId: number = null, departmentId: number = null, txtSearch: string) {
    console.log("Executing search doctor");
    this._doctorService.getDoctorByFilter(hospitalId, departmentId, txtSearch)
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
          console.log("error -------------");
          this.notFound = "Khong tim thay";
          this.dataSource = "";
          this.searchText = '';
          this.selectedHospital = '';
          this.selectedDepartment = '';
        }

      );
  }


  // Function: set active on off
  setActive(id) {
    this._doctorService.setActive(id)
      .subscribe(response => {
        console.log("Set active successful!");
      });
  }

  // onPageChange(event: PageEvent){
  //   console.log(event);
  //   console.log("Page index" + this.pageIndex);
  //   this.loadLength();
  //   this.loadDataTable(event.pageIndex + 1, this.length);
  // }
}

