import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from 'src/app/Services/payment.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

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
  patientId;
  public errorMsg;
  noPayments: boolean;
  constructor(
    private _paymentService: PaymentService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void {
    this.noPayments = false;
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
    'examinationId',
    'amount',
    'status',
    'createdAt',
    'modifiedAt'
  ];

  loadDataTable() {
    console.log("I am loading dataTable");
    if (this.patientId) {
      this._paymentService.getPaymentByFilter(this.patientId, null)
      .subscribe(response => {
        this.dataSource = response;
        this.dataSource = this.dataSource.data;
        this.dataSource = new MatTableDataSource(this.dataSource);
        console.log(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
        this.noPayments = true;
      });
    }
    else {
      this._paymentService.getAllPayments()
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

  // function search doctor
  searchPayment(txtSearch: string) {
    this._router.navigate(["/payments"]);

    console.log("Executing search Patient");
    // CONTINUE HERE
    this._paymentService.getPaymentByFilter(null, txtSearch)
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
    this._paymentService.setActive(id)
      .subscribe(response => {
        console.log("Set active successful!");
      });
  }

  reloadPage = () => {
    this._router.navigate(["/payments"]);
    this.patientId = null;
    this.noPayments = false;
    // this.loadDataTable();
  }
}
