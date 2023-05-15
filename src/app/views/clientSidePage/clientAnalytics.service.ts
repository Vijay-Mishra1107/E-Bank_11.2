import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, toArray } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Injectable({
  providedIn: 'root'
})
export class clientAnalyticsService {
  beareToken: any;
  userClientToken: any = localStorage.getItem("userClientToken");
  httpOption = {
    headers: new HttpHeaders({
      "authorization": `Bearer ${this.userClientToken}`,
    }),
  }
  constructor(private httpClient: HttpClient,
    public jwtAuth: JwtAuthService,
    ) {
      // this.jwtAuth.userClientToken();
     this.userClientToken = localStorage.getItem("userClientToken");
   }

  getData(url): Observable<any> {
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

  resetPassword(url, req): Observable<any> {
    let reqUrl = environment.baseUrl + url;
    return this.httpClient.post<any>(reqUrl, req, this.httpOption)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}









