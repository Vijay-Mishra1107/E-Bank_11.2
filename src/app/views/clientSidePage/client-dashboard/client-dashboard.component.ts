import { Component, OnInit, AfterViewInit, TemplateRef, } from "@angular/core";
import { clientAnalyticsService } from '../clientAnalytics.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { AppLoaderService } from "../../../shared/services/app-loader/app-loader.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
  selector: "app-clientDashboard",
  templateUrl: "./client-dashboard.component.html",
  styleUrls: ["./client-dashboard.component.scss"],
})
export class clientDashboardComponent implements OnInit, AfterViewInit {

  Data: any;
  public getItemSub: Subscription;
  ChargingSlotsData: any = [];
  Balance: any;
  viewBalance: boolean = false;
  ClientInfo: any = { account: '' };
  hide: boolean = true;

  constructor(
    private OflineCampData: clientAnalyticsService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    public jwtAuth: JwtAuthService,
  ) {
    this.hide = true;
    this.jwtAuth.userClientToken();
  }

  ngAfterViewInit() { }

  ngOnInit() {
    this.hide = true;
    if (localStorage.getItem('Ac') !== null && JSON.parse(localStorage.getItem('Ac')).account !== undefined) {
      this.ClientInfo = JSON.parse(localStorage.getItem('Ac'));
    } else {
      this.getAccountNumber();
    }
  }

  getAccountNumber() {
    this.getItemSub = this.OflineCampData.getData('client/accountNumber').subscribe(res => {
      if (res.status === "SUCCESS") {
        this.ClientInfo = res;
        localStorage.setItem('Ac', JSON.stringify(res));
      }
      this.loader.close();
    })
  }

  getViewBalance() {
    this.getItemSub = this.OflineCampData.getData('client/checkBalance').subscribe(res => {
      this.viewBalance = true;
      if (res.status === "SUCCESS") {
        // console.log(res);
        this.Balance = res.balance;
      }
      else {
        this.Balance = 'Initial server error'
      }
      //   this.loader.close();
    })
  }
  hiddeViewBalance() {
    this.viewBalance = false;
  }

  allPopupOpne(template: TemplateRef<any>) {
    // console.log("cccc")
    this.sendMoney.reset();
    this.withdrawalMoney.reset();
    this.depositeMoney.reset();
    this.dialog.open(template, {
      width: '500px',
      disableClose: true
    });
  }


  closePopUp() {
    this.hide = true;
    this.dialog.closeAll();
    this.sendMoney.reset();
    this.withdrawalMoney.reset();
    this.depositeMoney.reset();
    this.applyForLoan.reset();
  }

  //Send money Form Control
  get account() { return this.sendMoney.get('account') as FormControl; }
  get amount() { return this.sendMoney.get('amount') as FormControl; }
  get password() { return this.sendMoney.get('password') as FormControl; }

  //Send money Form Group
  sendMoney = new FormGroup({
    account: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    amount: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  onSendMoney() {
    this.hiddeViewBalance();
    this.loader.open();
    this.getItemSub = this.OflineCampData.postData('client/transfer', this.sendMoney.value).subscribe(res => {
      this.loader.close();
      if (res.status === "SUCCESS") {
        this.closePopUp();
        // console.log(res);
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'success', horizontalPosition: 'center' });
      }
      else {
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
      }
    })
  }

  get AmountRs() { return this.withdrawalMoney.get('AmountRs') as FormControl; }
  get PasswordPin() { return this.withdrawalMoney.get('PasswordPin') as FormControl; }

  withdrawalMoney = new FormGroup({
    AmountRs: new FormControl('', [Validators.required, Validators.minLength(1)]),
    PasswordPin: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  onWithdrawalMoney() {
    const req = {
      withdrawAmount: this.withdrawalMoney.value.AmountRs,
      password: this.withdrawalMoney.value.PasswordPin,
    }
    this.hiddeViewBalance();
    this.loader.open();
    this.getItemSub = this.OflineCampData.postData('client/withdraw', req).subscribe(res => {
      this.loader.close();
      if (res.status === "SUCCESS") {
        this.closePopUp();
        // console.log(res);
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'success', horizontalPosition: 'center' });
      }
      else {
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
      }
    })
  }

  get depositeAmount() { return this.depositeMoney.get('depositeAmount') as FormControl; }
  get depositePassword() { return this.depositeMoney.get('depositePassword') as FormControl; }

  depositeMoney = new FormGroup({
    depositeAmount: new FormControl('', [Validators.required, Validators.minLength(1)]),
    depositePassword: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  onDepositeMoney() {
    const req = {
      depositeAmount: this.depositeMoney.value.depositeAmount,
      password: this.depositeMoney.value.depositePassword,
    }
    this.hiddeViewBalance();
    this.loader.open();
    this.getItemSub = this.OflineCampData.postData('client/deposit', req).subscribe(res => {
      this.loader.close();
      if (res.status === "SUCCESS") {
        this.closePopUp();
        // console.log(res);
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'success', horizontalPosition: 'center' });
      }
      else {
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
      }
    })
  }

  //Request Check Book Form Control
  get name() { return this.requestCheckBook.get('name') as FormControl; }
  get address() { return this.requestCheckBook.get('address') as FormControl; }
  get Password() { return this.requestCheckBook.get('Password') as FormControl; }

  //Request Check Book Form Group
  requestCheckBook = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    address: new FormControl('', [Validators.required, Validators.minLength(1)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  onRequestCheckBookMoney() {
    this.hiddeViewBalance();
    this.loader.open();
    const req = {
      name: this.requestCheckBook.value.name,
      address: this.requestCheckBook.value.address,
      password: this.requestCheckBook.value.Password,
    }
    this.getItemSub = this.OflineCampData.postData('client/applyCheckBook', req).subscribe(res => {
      this.loader.close();
      if (res.status === "SUCCESS") {
        this.closePopUp();
        // console.log(res);
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'success', horizontalPosition: 'center' });
      }
      else {
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
      }
    })
  }

  LoanType: any[] = [
    { loanType: 'Personal Loan', value: 'personalLoan' },
    { loanType: 'Home Loan', value: 'homeLoan' },
  ];

  LoanTimeType: any[] = [
    { loanTimeType: 'Year', value: 'Year' },
  ];
  IinstallmentTime: any[] = [
    { installmentTime: 'Yearly', value: 'Yearly' },
  ];
  //Apply for loan Form Control
  applyForLoanPopupOpne(template: TemplateRef<any>) {
    this.applyForLoan.reset();
    this.applyForLoan.controls.loanType.setValue(this.LoanType[0].value);
    this.applyForLoan.controls.accountNumber.setValue(`${this.ClientInfo.account}`);
    this.applyForLoan.controls.installmentTime.setValue(this.IinstallmentTime[0].value);
    this.applyForLoan.controls.Name.setValue(this.ClientInfo.name);
    this.applyForLoan.controls.loanTimeType.setValue(this.LoanTimeType[0].value);
    this.applyForLoan.controls.afterLoanAmount.setValue(0);
    this.dialog.open(template, {
      disableClose: true
    });
  }

  get loanType() { return this.applyForLoan.get('loanType') as FormControl; };
  get accountNumber() { return this.applyForLoan.get('accountNumber') as FormControl; };
  get phone() { return this.applyForLoan.get('phone') as FormControl; };
  get Amount() { return this.applyForLoan.get('Amount') as FormControl; };
  get reason() { return this.applyForLoan.get('reason') as FormControl; };
  get Name() { return this.applyForLoan.get('Name') as FormControl; };
  get Address() { return this.applyForLoan.get('Address') as FormControl; };
  get loanTime() { return this.applyForLoan.get('loanTime') as FormControl; };
  get loanTimeType() { return this.applyForLoan.get('loanTimeType') as FormControl; };
  get installmentTime() { return this.applyForLoan.get('installmentTime') as FormControl; };
  get afterLoanAmount() { return this.applyForLoan.get('afterLoanAmount') as FormControl; };
  //Apply for loan Form Group
  applyForLoan = new FormGroup({
    loanType: new FormControl('', [Validators.required]),
    Name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    accountNumber: new FormControl({ value: '', disabled: true }),
    Amount: new FormControl('', [Validators.required, Validators.minLength(4)],),
    reason: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(400)]),
    Address: new FormControl('', [Validators.required, Validators.minLength(1)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    loanTimeType: new FormControl({ value: '', disabled: true }),
    loanTime: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.min(1), Validators.max(10)]),
    afterLoanAmount: new FormControl({ value: '', disabled: true }),
    installmentTime: new FormControl({ value: '', disabled: true }),
  });

  ammount: number = 0;
  touch: boolean = false;
  checkEditAmount(event: any): void {
    this.ammount = event.target.value;
    this.checkEditType();
  }
  checkEditType(): void {
    if (this.touch) {
      this.checkEditLoanTime({ target: { value: this.time } });
    }
  }

  time: number = 0;
  checkEditLoanTime(event: any): void {
    this.time = event.target.value;
    this.touch = true;
    const interest = (this.applyForLoan.value.loanType !== this.LoanType[0].value) ? 10 : 12;
    if ((this.time > 0 && this.time < 11) && (Number(this.ammount) > 0)) {
      const totoal = ((interest * this.time * Number(this.ammount)) / 100);
      this.applyForLoan.controls.afterLoanAmount.setValue(`${totoal + Number(this.ammount)}`);
    }else{
      this.applyForLoan.controls.afterLoanAmount.setValue(0);
    }
  }

  onApplyForLoan() {
    this.hiddeViewBalance();
    this.loader.open();
    const req = { 
      type: this.applyForLoan.value.loanType,
      amount: this.applyForLoan.value.Amount, 
      year: this.applyForLoan.value.loanTime, 
      reason: this.applyForLoan.value.reason, 
      accountNumber: this.ClientInfo.account,
    };
    // console.log(req);
    
    this.getItemSub = this.OflineCampData.postData('client/applyForLoan', req).subscribe(res => {
      this.loader.close();
      if (res.status === "SUCCESS") {
        this.closePopUp();
        // console.log(res);
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'success', horizontalPosition: 'center' });
      }
      else {
        this.snack.open(res.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
      }
    });
  }

  // ngOnDestroy
  ngOnDestroy() {
    this.hide = true;
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

}
