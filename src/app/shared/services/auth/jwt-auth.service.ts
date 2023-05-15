import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NavigationService } from "../navigation.service";
// import { TranslateService } from '@ngx-translate/core';
import { AppLoaderService } from "../app-loader/app-loader.service";


@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token: any;
  // refreshToken;
  // isAuthenticated: Boolean;
  signingIn: Boolean;
  // return: string;
  // APP_USER = "WiproBank_USER";
  // APP_USER_PERMISSIONS = 'USER_ACCESS_WiproBank';
  // APP_USER_MENU = 'USER_MENU';
  // REFRESH_TOKEN = 'REFRESH_TOKEN';
  // accessPermissions: string[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOption = {
    headers: new HttpHeaders({
      "authorization": localStorage.getItem("userAdminToken")
    }),
  }

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private snack: MatSnackBar,
    private navService: NavigationService,
    private route: ActivatedRoute,
    private loader: AppLoaderService,
  ) { }

  public signin(req) {
    this.loader.open();
    const postLoginUrl = environment.baseUrl + 'client/login';
    this.signingIn = true;
    return this.http.post(postLoginUrl, req)
      .pipe(map((res: any) => {
        console.log(res);
        if (res.status === "SUCCESS") { // && res.type === 'CLIENT'
          localStorage.setItem('role', 'client');
          localStorage.setItem('userClientToken', res.Token);
          localStorage.setItem('clientData', JSON.stringify(res));
          this.loader.close();
          this.router.navigateByUrl('client-analytics/client-analytics-WiproBank');
          this.snack.open(res.message, null,
            { duration: 5000, verticalPosition: 'top', panelClass: 'success', horizontalPosition: 'center' });
        } else {
          this.snack.open(res.message, null,
            { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
          this.router.navigateByUrl('sessions/signin');
          this.loader.close();
        }
        return res;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  public signinAdmin(req) {
    this.loader.open();
    const postLoginUrl = environment.baseUrl + 'admin/login';
    this.signingIn = true;
    return this.http.post(postLoginUrl, req)
      .pipe(map((res: any) => {
        // console.log(res);
        if (res.status === "SUCCESS") {
          localStorage.setItem('role', 'admin');
          localStorage.setItem('userAdminToken', res.Token);
          localStorage.setItem('adminData', JSON.stringify(res));
          this.loader.close();
          this.router.navigateByUrl('analyticsWiproBank/analytics-WiproBank');
          this.snack.open(res.message, null,
            { duration: 5000, verticalPosition: 'top', panelClass: 'success', horizontalPosition: 'center' });
        } else {
          this.snack.open(res.message, null,
            { duration: 200000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
          this.router.navigateByUrl('sessions/signin');
          this.loader.close();
        }
        return res;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }


  userClientToken() {
    const client = JSON.parse(localStorage.getItem('clientData'));
    if (client === null) {
      localStorage.clear();
      this.router.navigateByUrl('sessions/landing');
    } else {
      localStorage.setItem('userClientToken', client.Token);
      // localStorage.setItem('role', client.type.toLowerCase());
    }
  }

  userAdminToken() {
    const admin = JSON.parse(localStorage.getItem('adminData'));
    if (admin === null) {
      localStorage.clear();
      this.router.navigateByUrl('sessions/landing');
    } else {
      localStorage.setItem('userAdminToken', admin.Token);
      // localStorage.setItem('role', admin.role.toLowerCase());
    }
  }

  resetPassword(url, req) {
    let reqUrl = environment.baseUrl + url;
    return this.http.post<any>(reqUrl, req, this.httpOption)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  public signout() {
    this.router.navigateByUrl("sessions/landing");
    localStorage.clear();
  }

  isLoggedIn(): Boolean {
    console.log(this.getJwtToken());
    
    return !!this.getJwtToken();
  }

  getJwtToken(): any {
    console.log(this.ls.getItem('userAdminToken'));
    
    return (localStorage.getItem('role') !== 'client') ? this.ls.getItem('userAdminToken') : this.ls.getItem('userClientToken');
  }
  
}