import { Injectable } from '@angular/core';
import { LogService } from './Logging.service';
@Injectable({
    providedIn: 'root'
})

export class SearchFilterService {
    constructor(private Log: LogService) { }

    FilterButton: any =[
      {
        buttonName: 'All',
        type: 'all',
      },
      {
        buttonName: 'Current Month',
        type: 'current',
      },
      {
        buttonName: 'Past Month',
        type: 'pastMonth',
      },
      {
        buttonName: 'This Year',
        type: 'thisYear',
      }
    ]
    newFilterButton: any =[
      {
        buttonName: 'All',
        type: 'ALL',
      },
      {
        buttonName: 'Current Month',
        type: 'CURRENT_MONTH',
      },
      {
        buttonName: 'Past Month',
        type: 'LAST_MONTH',
      },
      {
        buttonName: 'This Year',
        type: 'CURRENT_YEAR',
      }
    ]
    
    temp: any = [];
    show: any;
    Filter(val: any, Data: any) {
        this.temp = Data;
        // this.Log.log(val);
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.username.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // this.Log.log("Return : " + temp);
        return temp;
    }
    date = new Date();
    allData(Data: any){
        this.temp = Data;
        const sDate = "2021-08-08";
        let endDate = new Date(this.date.getFullYear() + 1, 0, 0);
        let eMonth = endDate.getMonth() + 1;
        let eYear = endDate.getFullYear();
        let eDay = endDate.getDate();
        let eDate = eYear + "-" + eMonth + "-" + eDay;
  
        const temp = this.temp.filter(function (d) {
          return (
            d.join >= sDate && d.join <= eDate.toString()
          );
        });
        return temp;
    }

    currentMonth(Data: any){
        this.temp = Data;
        let join = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        let sMonth = join.getMonth() + 1;
        let sYear = join.getFullYear();
        let sDay = join.getDate();
        let sDate = sYear + "-" + sMonth + "-0" + sDay;
        let sDate01 = sYear + "-0" + sMonth + "-0" + sDay;
        let con = join.toDateString();
  
        let endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        let eMonth = endDate.getMonth() + 1;
        let eYear = endDate.getFullYear();
        let eDay = endDate.getDate();
        let eDate = eYear + "-" + eMonth + "-" + eDay;
        let eDate01 = eYear + "-0" + eMonth + "-" + eDay;
  
        const temp = this.temp.filter(function (d) {
          if (
            con == "1" ||
            con == "2" ||
            con == "3" ||
            con == "4" ||
            con == "5" ||
            con == "6" ||
            con == "7" ||
            con == "8" ||
            con == "9"
          ) {
            if (
              sMonth == 10 ||
              sMonth == 11 ||
              sMonth == 12 &&
              eMonth == 10 ||
              eMonth == 11 ||
              eMonth == 12
            ) {
              return (
                d.join >= sDate.toString() && d.join <= eDate.toString()
              );
            } else {
              return (
                d.join >= sDate01.toString() &&
                d.join <= eDate01.toString()
              );
            }
          } else {
            if (
              sMonth == 10 ||
              sMonth == 11 ||
              sMonth == 12 &&
              eMonth == 10 ||
              eMonth == 11 ||
              eMonth == 12
            ) {
              return (
                d.join >= sDate.toString() && d.join <= eDate.toString()
              );
            } else {
              return (
                d.join >= sDate01.toString() &&
                d.join <= eDate01.toString()
              );
            }
          }
        });
        return temp;
    }
    pastMonth(Data: any){
        this.temp = Data;
        let join = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
        let sMonth = join.getMonth() + 1;
        let sYear = join.getFullYear();
        let sDay = join.getDate();
        let sDate = sYear + "-" + sMonth + "-0" + sDay;
        let sDate01 = sYear + "-0" + sMonth + "-0" + sDay;
        let con = join.toDateString();
  
        let endDate = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        let eMonth = endDate.getMonth() + 1;
        let eYear = endDate.getFullYear();
        let eDay = endDate.getDate();
        let eDate = eYear + "-" + eMonth + "-" + eDay;
        let eDate01 = eYear + "-0" + eMonth + "-" + eDay;
  
        const temp = this.temp.filter(function (d) {
          if (
            con == "1" ||
            con == "2" ||
            con == "3" ||
            con == "4" ||
            con == "5" ||
            con == "6" ||
            con == "7" ||
            con == "8" ||
            con == "9"
          ) {
            if (sMonth == 10 || sMonth == 11 || sMonth == 12) {
              return (
                d.join >= sDate.toString() && d.join <= eDate.toString()
              );
            } else {
              return (
                d.join >= sDate01.toString() &&
                d.join <= eDate01.toString()
              );
            }
          } else {
            if (sMonth == 10 || sMonth == 11 || sMonth == 12) {
              return (
                d.join >= sDate.toString() && d.join <= eDate.toString()
              );
            } else {
              return (
                d.join >= sDate01.toString() &&
                d.join <= eDate01.toString()
              );
            }
          }
        });
    return temp;
    }

    thisYear(Data: any){
        this.temp = Data;

        let join = new Date(this.date.getFullYear(), 0, 1);
      let sMonth = join.getMonth() + 1;
      let sYear = join.getFullYear();
      let sDay = join.getDate();
      let sDate = sYear + "-0" + sMonth + "-0" + sDay;
      // console.log(sDate);
      let endDate = new Date(this.date.getFullYear() + 1, 0, 0);
      let eMonth = endDate.getMonth() + 1;
      let eYear = endDate.getFullYear();
      let eDay = endDate.getDate();
      let eDate = eYear + "-" + eMonth + "-" + eDay;
      // console.log(eDate);

      const temp = this.temp.filter(function (d) {
        return (
          d.join >= sDate.toString() && d.join <= eDate.toString()
        );
      });
      return temp;
    }

    FilterAbnormal(val: any, Data: any) {
        this.temp = Data;
        // this.Log.log(val);

        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // this.Log.log("Return : " + temp);
        return temp;
    }

    normalOthersFilter(val: any, Data: any){
      this.temp = Data;
        // this.Log.log(val);
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // this.Log.log("Return : " + temp);
        return temp;
    }
    OrganisationsFilter(val: any, Data: any){
      this.temp = Data;
        // this.Log.log(val);
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.organisationName.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // this.Log.log("Return : " + temp);
        return temp;
    }
}

