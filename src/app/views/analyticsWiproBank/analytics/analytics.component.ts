import { Component, OnInit, AfterViewInit, ViewChild, } from "@angular/core";
import { analyticsWiproBank } from '../analyticsWiproBank.service';
import { Subscription } from 'rxjs';
import { SearchFilterService } from "../../search-Filter/search-filter.service";
import { AppLoaderService } from "../../../shared/services/app-loader/app-loader.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  Data: any;
  public getItemSub: Subscription;
  ChargingSlotsData: any = [];
  allClientList: any = [];
  temp: any;
  FilterButton: any;

  constructor(
    private AdminData: analyticsWiproBank,
    private Filter: SearchFilterService,
    private loader: AppLoaderService,
    public jwtAuth: JwtAuthService,
  ) {
    this.FilterButton = this.Filter.FilterButton;
    this.jwtAuth.userAdminToken();
  }
  @ViewChild("myTable") myTable;

  ngAfterViewInit() { }

  FilterButtonItem: any = null;
  FilterName: any;
  ngOnInit() {
    this.FilterName = this.FilterButton[0].buttonName;
    this.FilterButtonItem = this.FilterButton[0];
    this.FilterButtonStyle(this.FilterButton[0]);
    this.getClientData();
  }

  getClientData() {
    this.loader.open();
    this.getItemSub = this.AdminData.getClientData('admin/getAllClients').subscribe(Data => {
      if (Data.status === "SUCCESS") {
        this.Data = Data;
        this.allClientList = Data.data;
        this.temp = Data.data;
        // this.LogService.log(this.allClientList);
      }
      setTimeout(() => {
      this.loader.close();
      }, 1000);
    })
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
  }

  // Filter Button Style
  FilterButtonStyle(category) {
    return {
      'color': this.FilterButtonItem && this.FilterButtonItem.type == category.type ? '#fbfbfb' : '#27458f',
      'background-color': this.FilterButtonItem && this.FilterButtonItem.type == category.type ? '#27458f' : '#fbfbfb',
    };
  }

  filter(event) {
    // console.log(event);
    this.FilterButtonItem = event;
    if (event.type == "all") {
      this.FilterName = event.buttonName;
      let Data = this.temp;
      const temp = this.Filter.allData(Data)
      // update the rows
      this.allClientList = temp;
    }
    if (event.type == "current") {
      this.FilterName = event.buttonName;
      let Data = this.temp;
      const temp = this.Filter.currentMonth(Data)
      // update the rows
      this.allClientList = temp;
    }
    if (event.type == "pastMonth") {
      this.FilterName = event.buttonName;
      let Data = this.temp;
      const temp = this.Filter.pastMonth(Data);
      // update the rows
      this.allClientList = temp;
    }
    if (event.type == "thisYear") {
      this.FilterName = event.buttonName;
      let Data = this.temp;
      const temp = this.Filter.thisYear(Data);
      // update the rows
      this.allClientList = temp;
    }
  }

  // ngOnDestroy
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }

  selectedCamp: any;
  onSelect(selected) {
    // this.selected.push(...selected);
    this.selectedCamp = [];
    // this.LogService.log(selected);
    this.selectedCamp = selected;
    // this.LogService.log(this.selectedCamp);
  }
  
}
