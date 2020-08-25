import { DialogStaffComponent } from './../general-components/dialog-staff/dialog-staff.component';
import { IStaff } from './../../Entity/staff';
import { MatTableDataSource } from '@angular/material/table';
import { StaffService } from './../../Services/staff.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  notFound;
  colorSlide="primary";
  searchText;
  constructor(
    private dialog: MatDialog,
    private _staffService: StaffService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource;
  displayedColumns: string[] = [
    'index',
    'id',
    'hospital',
    'title',
    'fullName',
    'gender',
    'phone',
    'dateOfBirth',
    'address',
    'email',
    'userName',
    'avatar',
    'actions',
    'isActive'
  ];

  ngOnInit(): void {
    this.loadDataTable();
  }

  loadDataTable() {
    console.log('Loading Staffs data table...');
    this._staffService.getAllStaff()
      .subscribe(response => {
        this.dataSource = response;
        this.dataSource = this.dataSource.data;
        console.log("dataSource", this.dataSource);
        this.dataSource = new MatTableDataSource(this.dataSource);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogStaffComponent, {
      data: { type: 'create' }
    });
    // dialogRef.updateSize("400px","500px");
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      setTimeout(() => {
        this.loadDataTable();
      }, 3000);
    });
  }

  editRecord(staff: IStaff) {
    let dialogRef = this.dialog.open(DialogStaffComponent, {
      data: {
        type: 'edit',
        id: staff.id,
        hospital: staff.hospitalId,
        isActive: staff.isActive,
        fullName: staff.user.fullName,
        title: staff.user.title,
        gender: staff.user.gender,
        phoneNumber: staff.user.phoneNumber,
        dateOfBirth: staff.user.dateOfBirth,
        address: staff.user.address,
        email: staff.user.email,
        username: staff.user.username
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

  // function search doctor
  searchStaff(txtSearch: string) {
    console.log("Executing search Patient");
    // CONTINUE HERE
    this._staffService.getStaffByFilter(txtSearch)
      .subscribe(response => {
        this.dataSource = response;
        console.log(this.dataSource);
        this.dataSource = this.dataSource.data;
        console.log(this.dataSource);
        this.dataSource = new MatTableDataSource(this.dataSource);
        console.log(this.dataSource);
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
      this._staffService.setActive(id)
        .subscribe(response => {
          console.log("Set active successful!");
        });
    }
}
