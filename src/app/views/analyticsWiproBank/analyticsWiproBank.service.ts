import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, toArray } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Injectable({
  providedIn: 'root'
})
export class analyticsWiproBank {
  beareToken: any;
  httpOption = {
    headers: new HttpHeaders({
      "authorization": localStorage.getItem("userAdminToken")
    }),
  }
  constructor(private httpClient: HttpClient,
    public jwtAuth: JwtAuthService,
    ) { }

  getClientData(url): Observable<any> {
    let reqUrl = environment.baseUrl + url;
    return this.httpClient.get<any>(reqUrl, this.httpOption)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  
  postData(url, req): Observable<any> {
    let reqUrl = environment.baseUrl + url;
    return this.httpClient.post<any>(reqUrl, req, this.httpOption)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  postParmData(url, req): Observable<any> {
    let reqUrl = environment.baseUrl + url + '/' + req.accountNumber;
    return this.httpClient.delete<any>(reqUrl, this.httpOption)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}









