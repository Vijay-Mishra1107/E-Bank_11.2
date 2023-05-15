import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';

interface LoginType {
  value: string;
  loginValue: string;
}
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  loginType: LoginType[] = [
    { value: 'admin', loginValue: 'Admin' },
    { value: 'client', loginValue: 'Client' },
  ];
  signinForm: FormGroup;
  errorMsg = '';
  return: string;

  formType = false;
  status = false;
  docVersion = false;
  constructor(
    private jwtAuth: JwtAuthService,
  ) { }
  role: string = 'client';

  ngOnInit(): void {
    this.role = 'client';
    localStorage.setItem('loginRole', this.role);
    this.signinForm = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      rememberMe: new FormControl(false,),
    });

  }

  ngAfterViewInit() { }

  ngOnDestroy() { }

  signin() {
    const signinData = {
      role: this.role,
      email: this.signinForm.value.email,
      password: this.signinForm.value.password,
    };
    
    if (this.role === 'client') {
      this.jwtAuth.signin(signinData).subscribe(response => {
      }, err => { this.errorMsg = err.message; })
    } else { 
      this.jwtAuth.signinAdmin(signinData).subscribe(response => {
      }, err => {
        this.errorMsg = err.message;
      });
    }
  }

  clickEvent(): void {
    this.status = !this.status;
    if (this.status !== false) {
      this.docVersion = !this.docVersion;
      this.roleChanged(this.loginType[0]);
    }
    else {
      this.docVersion = !this.docVersion;
      this.roleChanged(this.loginType[1]);
    }
    setTimeout(() => {
      this.formType = !this.formType;
      this.signinForm = new FormGroup({
        email: new FormControl('', [Validators.required,]),
        password: new FormControl('', [Validators.required]),
        rememberMe: new FormControl(true)
      });
    }, 1000);
  }

  roleChanged(selectedRole): void {
    localStorage.clear();
    this.role = selectedRole.value;
    localStorage.setItem('loginRole', selectedRole.value);
  }
}
