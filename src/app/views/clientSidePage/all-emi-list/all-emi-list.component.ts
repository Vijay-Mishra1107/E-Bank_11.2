import { Component, OnInit, AfterViewInit, TemplateRef } from "@angular/core";
import { Subscription } from 'rxjs';
import { clientAnalyticsService } from '../clientAnalytics.service';
import { AppLoaderService } from "../../../shared/services/app-loader/app-loader.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-all-emi-list',
  templateUrl: './all-emi-list.component.html',
  styleUrls: ['./all-emi-list.component.scss'],
})
export class AllEmiListComponent implements OnInit, AfterViewInit {
  Data: any;
  public getItemSub: Subscription;
  allClientList: any = [];
  temp: any;
  constructor(
    private clientData: clientAnalyticsService,
    private loader: AppLoaderService,
    public jwtAuth: JwtAuthService,
    public dialog: MatDialog
  ) {
    this.jwtAuth.userClientToken();
  }

  ngOnInit(): void {
    this.getLoanData();
  }

  getLoanData() {
    this.loader.open();
    this.getItemSub = this.clientData.postData('client/getUserDetails', { accountNumber: this.getAccountNumber() }).subscribe(Data => {
      if (Data.status === "SUCCESS") {
        // console.log(Data);
        this.Data = Data;
        this.allClientList = Data.data;
        this.temp = Data.data;
        // this.checkDataStatus();
      }
      this.loader.close();
    });
  }

  getAccountNumber(): any {
    if (localStorage.getItem('Ac') !== null && JSON.parse(localStorage.getItem('Ac')).account !== undefined) {
      const accountNumber = JSON.parse(localStorage.getItem('Ac'))
      return accountNumber.account;
    } else {
      this.getItemSub = this.clientData.getData('client/accountNumber').subscribe(res => {
        if (res.status === "SUCCESS") {
          localStorage.setItem('Ac', JSON.stringify(res));
          return res.account;
        }
      })
    }
  }

  ngAfterViewInit() { }

  // ngOnDestroy
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  //Send money Form Control
  get loanId() { return this.payEmiForm.get('loanId') as FormControl; }
  get amount() { return this.payEmiForm.get('amount') as FormControl; }
  get password() { return this.payEmiForm.get('password') as FormControl; }

  //Send money Form Group
  payEmiForm: FormGroup;

  payEMI(data: any): void {
    // console.log(data);
    this.payEmiForm = new FormGroup({
      loanId: new FormControl({ value: data?.loanID, disabled: true }),
      amount: new FormControl({ value: data?.emiAmmount, disabled: true }),
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
    });
  }
  emi: any = {};
  allPopupOpne(row: any, template: TemplateRef<any>) {
    // console.log("cccc")
    this.emi = row;
    this.payEMI(row);
    this.dialog.open(template, { width: '550px', disableClose: true });
  }

  closePopUp() {
    this.dialog.closeAll();
    this.payEmiForm.reset();
  }

  PayEMI(): void {
    this.loader.open();
    this.getItemSub = this.clientData.postData('client/payEmi', { loanid: this.emi?.loanID, emiID: this.emi?.id }).subscribe(Data => {
      if (Data.status === "SUCCESS") {
        console.log(Data);
        this.closePopUp();
        setTimeout(() => {
          this.getLoanData();
        }, 500);
        // this.checkDataStatus();
      }
    });
  }

}
