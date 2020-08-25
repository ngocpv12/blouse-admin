
import { DialogHospitalComponent } from './../general-components/dialog-hospital/dialog-hospital.component';
import { IHospital } from './../../Entity/hospital';
import { HospitalService } from './../../Services/hospital.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  notFound;
  colorSlide = "primary";
  searchText;
  dataSource;
  public errorMsg;

  constructor(private dialog: MatDialog, private _hospitalService: HospitalService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.loadDataTable();
  }

  displayedColumns: string[] = ['id', 'name', 'address', 'phone', 'website', 'email', 'description', 'actions', 'isActive'];

  loadDataTable() {
    console.log("I am loading dataTable");
    this._hospitalService.getAllHospital()
      .subscribe(response => {
        this.dataSource = response;
        this.dataSource = this.dataSource.data;
        this.dataSource = new MatTableDataSource(this.dataSource);
        console.log(this.dataSource);
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
    // let dialogConfig = new MatDialogConfig();
    // dialogConfig.width = "50%";
    let dialogRef = this.dialog.open(DialogHospitalComponent, {
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

  editHospital(hospital: IHospital) {
    let dialogRef = this.dialog.open(DialogHospitalComponent, {
      data: {
        type: 'edit', id: hospital.id, name: hospital.name, address: hospital.address, phoneNumber: hospital.phoneNumber,
        website: hospital.website, email: hospital.email, description: hospital.description
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
  searchHospital(txtSearch: string) {
    console.log("Executing search Patient");
    // CONTINUE HERE
    this._hospitalService.getHospitalByFilter(txtSearch)
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
    this._hospitalService.setActive(id)
      .subscribe(response => {
        console.log("Set active successful!");
      },
        err => {
          console.log("error:", err);
        });
  }
} 
