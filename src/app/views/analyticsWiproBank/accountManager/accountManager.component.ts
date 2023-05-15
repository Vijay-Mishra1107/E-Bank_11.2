import { Component, OnInit, AfterViewInit, TemplateRef, } from "@angular/core";
import { analyticsWiproBank } from '../analyticsWiproBank.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { AppLoaderService } from "../../../shared/services/app-loader/app-loader.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
  selector: "app-accountManager",
  templateUrl: "./accountManager.component.html",
  styleUrls: ["./accountManager.component.scss"],
})
export class accountManager implements OnInit, AfterViewInit {
  Data: any;
  public getItemSub: Subscription;
  ChargingSlotsData: any = [];
  Balance: any;
  viewBalance: boolean = false;
  FacilityDescription: object = {};

  constructor(
    private OflineCampData: analyticsWiproBank,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    public jwtAuth: JwtAuthService,
  ) {
    this.jwtAuth.userAdminToken();
  }

  FreezeAccount: object = {
    name: 'Freeze Account',
    url: 'admin/freezAccount',
  }

  DeleteAccount: object = {
    name: 'Delete Account',
    url: 'admin/delete',
  }

  UnFreezeAccount: object = {
    name: 'Unfreeze Account',
    url: 'admin/unfreezAccount',
  }

  ngAfterViewInit() { }

  ngOnInit() { }

  allPopupOpne(req, template: TemplateRef<any>) {
    this.FacilityDescription = {};
    this.FacilityDescription = req;
    this.allFacility = new FormGroup({
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      emailId: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]),
      phoneNo: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      userName: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]),
    });
    // console.log(this.FacilityDescription)
    this.dialog.open(template, {
      width: '500px', disableClose: true,
    });
  }

  closePopUp() {
    this.dialog.closeAll();
    this.allFacility = new FormGroup({
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      emailId: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]),
      phoneNo: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      userName: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]),
    });
  }

  //Form Control
  get accountNumber() { return this.allFacility.get('accountNumber') as FormControl; }
  get emailId() { return this.allFacility.get('emailId') as FormControl; }
  get phoneNo() { return this.allFacility.get('phoneNo') as FormControl; }
  get userName() { return this.allFacility.get('userName') as FormControl; }

  //Form Group
  allFacility = new FormGroup({
    accountNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    emailId: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]),
    phoneNo: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    userName: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]),
  });

  onAllFacility(req) {
    this.loader.open();
    // console.log(this.allFacility.value, req.url);
    if (req.name !== 'Delete Account') {
      this.getItemSub = this.OflineCampData.postData(req.url, this.allFacility.value).subscribe(res => {
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
    } else {
      this.getItemSub = this.OflineCampData.postParmData(req.url, this.allFacility.value).subscribe(res => {
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
  }

  crossCheck(event) {
    if (event.target.value.length === 10) {
      const url = 'admin/crossCheck/' + event.target.value;
      this.getItemSub = this.OflineCampData.getClientData(url).subscribe(res => {
        if (res.status === "SUCCESS") {
          this.crossCheckAccountDetails(res.data);
        }
        else {
          this.snack.open('Please check your account number.', null,
            { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
        }
      })
    }
  }

  crossCheckAccountDetails(selectedAccountNumber) {
    this.allFacility.controls['emailId'].setValue(selectedAccountNumber.email);
    this.allFacility.controls['phoneNo'].setValue(selectedAccountNumber.phone);
    this.allFacility.controls['userName'].setValue(selectedAccountNumber.name);
  }
  // ngOnDestroy
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

}
