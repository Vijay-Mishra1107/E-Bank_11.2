import { Component, OnInit, AfterViewInit, ViewChild, } from "@angular/core";
import { clientAnalyticsService } from '../clientAnalytics.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LogService } from "../../search-Filter/Logging.service";
import { AppLoaderService } from "../../../shared/services/app-loader/app-loader.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
  selector: "app-clientAnalytics",
  templateUrl: "./clientAnalytics.component.html",
  styleUrls: ["./clientAnalytics.component.scss"],
})
export class clientAnalyticsComponent implements OnInit, AfterViewInit {

  Data: any;
  public getItemSub: Subscription;
  transactionList: any = [];

  constructor(
    private OflineCampData: clientAnalyticsService,
    private loader: AppLoaderService,
    private LogService: LogService,
    private snack: MatSnackBar,
    public jwtAuth: JwtAuthService,
  ) {
    this.jwtAuth.userClientToken();
  }
  @ViewChild("myTable") myTable;

  ngAfterViewInit() { }

  FilterButtonItem: any = null;
  FilterName: any;
  ngOnInit() {
    this.loader.open();
    this.getTransactionsData();
  }

  getTransactionsData() {
    this.getItemSub = this.OflineCampData.getData('client/transaction').subscribe(Data => {
      if (Data.status === "SUCCESS") {
        this.Data = Data;
        this.transactionList = Data.data;
        // this.LogService.log(this.transactionList);
      }
      this.loader.close();
    })
  }
  
  // ngOnDestroy
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  downloadExcel(){
    const url = 'client/getExcel'
    this.getItemSub = this.OflineCampData.getData(url).subscribe(Data => {
      // console.log(Data);
      if (Data.status === "SUCCESS") {
        const url = environment.baseUrl + Data.link;
        this.Download(url)
        this.snack.open(Data.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'success', horizontalPosition: 'center' });
      }
      else{
        this.snack.open(Data.message, null,
          { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
      }
      this.loader.close();
    })
    // const Url = environment.baseUrl + 'client/getExcel';
  }

  Download(url){
    // FileSaver.saveAs(url);
  }
  
 
  onActivate(event) {
    // console.log('Activate Event', event);
  }

}
