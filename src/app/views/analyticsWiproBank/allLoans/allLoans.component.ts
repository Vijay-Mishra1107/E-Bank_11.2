import { Component, OnInit, AfterViewInit, ViewChild, } from "@angular/core";
import { analyticsWiproBank } from '../analyticsWiproBank.service';
import { Subscription } from 'rxjs';
import { SearchFilterService } from "../../search-Filter/search-filter.service";
import { AppLoaderService } from "../../../shared/services/app-loader/app-loader.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
  selector: "app-allLoans",
  templateUrl: "./allLoans.component.html",
  styleUrls: ["./allLoans.component.scss"],
})
export class AllLoansComponent implements OnInit, AfterViewInit {
  Data: any;
  public getItemSub: Subscription;
  allClientList: any = [];
  temp: any;

  constructor(
    private AdminData: analyticsWiproBank,
    private Filter: SearchFilterService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    public jwtAuth: JwtAuthService,
  ) {
    this.jwtAuth.userAdminToken();
  }
  @ViewChild("LoanApplications") LoanApplications;
  @ViewChild("ApprovedLoans") ApprovedLoans;
  @ViewChild("CompletedLoans") CompletedLoans;
  @ViewChild("DeclineLoans") DeclineLoans;


  ngAfterViewInit() { }

  ngOnInit() {
    this.getClientData();
  }

  getClientData() {
    this.loader.open();
    this.getItemSub = this.AdminData.getClientData('admin/getLoanDetails').subscribe(Data => {
      if (Data.status === "SUCCESS") {
        // console.log(Data);
        this.Data = Data;
        this.allClientList = Data.data;
        this.temp = Data.data;
        this.checkDataStatus();
      }
      setTimeout(() => {
        this.loader.close();
      }, 1000);
    });
  }

  loanApplications: any[] = [];
  approvedLoans: any[] = [];
  completedLoans: any[] = [];
  declineLoans: any[] = [];
  checkDataStatus(): void {
    this.approvedLoans = this.statusFilter('approved');
    this.loanApplications = this.statusFilter('pending');
    this.completedLoans = this.statusFilter('completed');
    this.declineLoans = this.statusFilter('decline');
  }

  statusFilter(value: string): any {
    const byStatusArray = this.allClientList.filter((d: any) => d.status.toLowerCase().indexOf(value) !== -1 || !value);
    return byStatusArray;
  }


  // search campaign Filter
  show = false;
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    let Data = this.temp;
    // filter our data
    const temp = this.Filter.Filter(val, Data);
    // this.LogService.log(temp);
    if (temp == null || temp == undefined || temp == "") {
      this.show = true;
    } else if (event == "" || temp != null || temp != undefined || temp != "") {
      this.show = false;
    }
    // update the rows
    this.allClientList = temp;
    this.checkDataStatus();
  }

  // ngOnDestroy
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  loanApprovedAndDecline(row: any, status: any): void {
    console.log(row)
    const req = {
      status: status,
      accountNumber: row?.accountNumber,
      loanid: row?.loanID,
    }
    this.getItemSub = this.AdminData.postData('admin/approveLoan', req).subscribe(res => {
      if (res.status === "SUCCESS") {
        console.log(res);
        this.getClientData();

        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'success', horizontalPosition: 'center' });
      } else {
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
      }
      this.loader.close();
    });
  }

  loanForReason: string = '';
  toggleExpandRow(row: any, tableType: string): void {
    console.log(this.LoanApplications);
    this.loanForReason = row?.reason;
    console.log('Toggled Expand Row!', row);
    if (tableType === 'loanApplications') {
      this.LoanApplications.rowDetail.collapseAllRows();
      this.LoanApplications.rowDetail.toggleExpandRow(row);
    } else if (tableType === 'approvedLoans') {
      this.ApprovedLoans.rowDetail.collapseAllRows();
      this.ApprovedLoans.rowDetail.toggleExpandRow(row);
    } else if (tableType === 'completedLoans') {
      this.CompletedLoans.rowDetail.collapseAllRows();
      this.CompletedLoans.rowDetail.toggleExpandRow(row);
    }
  }
  CollapseAllRow(row: any, tableType: string): void {
    if (tableType === 'loanApplications') {
      this.LoanApplications.rowDetail.collapseAllRows();
    } else if (tableType === 'approvedLoans') {
      this.ApprovedLoans.rowDetail.collapseAllRows();
    } else if (tableType === 'completedLoans') {
      this.CompletedLoans.rowDetail.collapseAllRows();
    }
  }
}
