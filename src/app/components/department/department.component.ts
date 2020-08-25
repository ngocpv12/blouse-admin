import { Validators } from '@angular/forms';
import { HospitalService } from 'src/app/Services/hospital.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { IDepartment } from 'src/app/Entity/department';
import { DialogDepartmentComponent } from '../general-components/dialog-department/dialog-department.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

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
    private _departmentService: DepartmentService,
    private _hospitalService: HospitalService,
    private _router: Router
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void {
    this.loadDataTable();
    this.loadHospitalInfo();
  }
  displayedColumns: string[] = ['index', 'id','name','address', 'phoneNumber', 'website', 'email', 'description', 'hospital', 'actions', 'isActive'];

  loadDataTable() {
    console.log("I am loading dataTable");
    this._departmentService.getAllDepartments()
      .subscribe(response => {
        this.dataSource = response;
        this.dataSource = this.dataSource.data;
        this.dataSource = new MatTableDataSource(this.dataSource);
        console.log(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {console.log("error:",error)});
  }
  openDialog() {

    let dialogRef = this._dialog.open(DialogDepartmentComponent, {
      data: { type: 'create', dataSource: this.dataSource }
    });
    // dialogRef.updateSize("400px","500px");
    dialogRef.afterClosed().subscribe(result => { 
      console.log(`Dialog result: ${result}`);
      setTimeout(() => {
        this.loadDataTable();
      }, 3000);
    });
  }


  // function search doctor
  searchDepartment(hospitalId:number,txtSearch: string) {
    console.log("Executing search Patient");
    // CONTINUE HERE
    this._departmentService.getDepartmentByFilter(hospitalId,txtSearch)
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
  editDepartment(department: IDepartment) {
    let dialogRef = this._dialog.open(DialogDepartmentComponent, {
      data: {
        type: 'edit',
        id: department.id,
        name: department.name,
        address: department.address,
        phoneNumber: department.phoneNumber,
        website: department.website,
        email: department.email,
        description: department.description,
        hospital: department.hospital,
        hospitalId: department.hospital.id,
        isActive: department.isActive
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      setTimeout(() => {
        this.loadDataTable();
      }, 3000);
    },
      error => console.log('Update Fail', error)
    );
  }

  // Function: set active on off
  setActive(id) {
    this._departmentService.setActive(id)
      .subscribe(response => {
        console.log("Set active successful!");
      });
  }
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
}
