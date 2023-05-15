import { Component, OnInit } from "@angular/core";
import { Validators, FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { Subscription } from 'rxjs';
import { analyticsWiproBank } from '../analyticsWiproBank.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, } from "@angular/router";
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";

@Component({
  selector: "app-addNewClient",
  templateUrl: "./addNewClient.component.html",
  styleUrls: ["./addNewClient.component.scss"],
})
export class AddNewClientComponent implements OnInit {
  public getItemSub: Subscription;

  constructor(private fb: FormBuilder,
    private jwtAuth: JwtAuthService,
    private AdminData: analyticsWiproBank,
    private snack: MatSnackBar,
    private router: Router,
    private loader: AppLoaderService,
  ) {
    this.jwtAuth.userAdminToken();
  }

  get firstName() { return this.AddNewClientForm.get('firstName') as FormControl; }
  get lastName() { return this.AddNewClientForm.get('lastName') as FormControl; }
  get email() { return this.AddNewClientForm.get('email') as FormControl; }
  get phone() { return this.AddNewClientForm.get('phone') as FormControl; }
  get address() { return this.AddNewClientForm.get('address') as FormControl; }
  get agreed() { return this.AddNewClientForm.get('agreed') as FormControl; }

  ngOnInit() {
    const password = new FormControl("", Validators.required);

    this.AddNewClientForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      agreed: new FormControl(false, [Validators.required]),
    });
  }

  AddNewClientForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    address: new FormControl('', [Validators.required, Validators.minLength(3)]),
    agreed: new FormControl(false, [Validators.required]),
  });

  refresh() {
    this.AddNewClientForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      agreed: new FormControl(false, [Validators.required]),
    });
  }
  onSubmit() {
    this.loader.open();

    if (!this.AddNewClientForm.invalid) {
      const req = {
        user: this.AddNewClientForm.value.firstName + ' ' + this.AddNewClientForm.value.lastName,
        email: this.AddNewClientForm.value.email,
        phone: this.AddNewClientForm.value.phone,
        address: this.AddNewClientForm.value.address,
      }
      // do what you wnat with your data
      // console.log(req);
      this.getItemSub = this.AdminData.postData('admin/register', req).subscribe(res => {
        if (res.status === "SUCCESS") {
          // console.log(res);
          this.refresh();
          this.router.navigateByUrl('analyticsWiproBank/analytics-WiproBank');
          this.snack.open(res.message, null,
            { duration: 5000, verticalPosition: 'top', panelClass: 'success', horizontalPosition: 'center' });
        }
        else {
          this.snack.open(res.message, null,
            { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
        }
      })
    }

    setTimeout(() => {
      this.loader.close();
    }, 1000);
  }
}
