import { Component, OnInit, EventEmitter, Input, Output, Renderer2, TemplateRef, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { analyticsWiproBank } from 'app/views/analyticsWiproBank/analyticsWiproBank.service';
import { Subscription } from 'rxjs';
import { RoutePartsService } from '../../../shared/services/route-parts.service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot, } from '@angular/router';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppLoaderService } from "../../../shared/services/app-loader/app-loader.service";
import { clientAnalyticsService } from "../../../views/clientSidePage/clientAnalytics.service";

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html',
  styleUrls: ['./header-side.component.scss']
})
export class HeaderSideComponent implements OnInit {
  hide = true;
  newPass = true;
  @Input() notificPanel;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'flag-icon-es'
  }]
  currentLang = this.availableLangs[0];
  Data: any;
  public getItemSub: Subscription;
  public WiproBankThemes;
  public layoutConf: any;
  stationId: any;
  stationStatus: any;
  networkStrength: any;
  public egretThemes;
  routerEventSub: Subscription;
  routeParts: any[];

  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService,
    private dashboardData: analyticsWiproBank,
    private routePartsService: RoutePartsService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private clientAnalyticsService: clientAnalyticsService,
  ) {
    this.hide = true;
    this.newPass = true;
    this.routeParts = this.routePartsService.generateRouteParts(
      this.activeRoute.snapshot
    );
    // console.log(this.routeParts[0].breadcrumb);
    this.NavigationPath(this.routeParts[0].breadcrumb);
    this.routerEventSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routeChange) => {
        this.routeParts = this.routePartsService.generateRouteParts(
          this.activeRoute.snapshot
        );
        // generate url from parts
        this.routeParts.reverse().map((item, i) => {
          item.breadcrumb = this.parseText(item);
          item.urlSegments.forEach((urlSegment, j) => {
            if (j === 0) { return (item.url = `${urlSegment.path}`); }
            item.url += `/${urlSegment.path}`;
          });
          if (i === 0) {
            return item;
          }
          // prepend previous part to current part
          item.url = `${this.routeParts[i - 1].url}/${item.url}`;
          return item;
        });
        // console.log(this.routeParts);
      });
  }
  clientUser: any;
  adminUser: any;
  ngOnInit() {
    this.hide = true;
    this.newPass = true;
    this.WiproBankThemes = this.themeService.WiproBankThemes;
    this.layoutConf = this.layout.layoutConf;
    this.clientUser = JSON.parse(localStorage.getItem('clientData'));
    this.adminUser = JSON.parse(localStorage.getItem('adminData'));
    if (this.clientUser !== null && this.clientUser.type === 'CLIENT') {
      localStorage.removeItem('adminData');
    }
    else if (this.adminUser !== null && this.adminUser.type === 'ADMIN') {
      localStorage.removeItem('clientData');
    }
    // console.log(this.clientUser);
  }
  setLang(lng) {

  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'full') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'compact',
        sidebarCompactToggle: true
      }, { transitionClass: true })
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'full',
      sidebarCompactToggle: false
    }, { transitionClass: true })

  }

  onSearch(e) {
    //   console.log(e)
  }

  Icon: any;
  Path: any;
  View: any;
  LinkUrl: any;
  image: any;
  image_URL: any;
  NavigationPath(path) {
    if (path === 'client-dashboard-WiproBank') {
      this.Icon = 'account_balance';
      this.Path = 'Client';
      this.View = 'Dashboard';
      this.LinkUrl = false;
      this.image = false;
    }
    if (path === 'account-manager'){
      this.Icon = 'account_balance';
      this.Path = 'Admin';
      this.View = 'Dashboard';
      this.LinkUrl = false;
      this.image = false;
    }
    if (path === 'client-analytics-WiproBank') {
      this.Icon = 'medical_services';
      this.Path = 'Client';
      this.View = 'Transactions History';
      this.LinkUrl = false;
      this.image = false;
    }
    if (path === 'add-new-client') {
      this.Icon = 'group_add';
      this.Path = '';
      this.View = 'Add New Account User';
      this.LinkUrl = true;
      this.image = false;
    }
    if (path === 'analytics-WiproBank') {
      this.Icon = 'group_add';
      this.Path = '';
      this.View = 'All Accounts';
      this.LinkUrl = true;
      this.image = false;
    }
    if (path === 'allLoans-WiproBank') {
      this.Icon = 'real_estate_agent';
      this.Path = '';
      this.View = 'Loans List';
      this.LinkUrl = true;
      this.image = false;
    }
    if (path === 'all-loan_EMI') {
      this.Icon = 'real_estate_agent';
      this.Path = '';
      this.View = 'Loan Details';
      this.LinkUrl = true;
      this.image = false;
    }
  }

  parseText(part) {
    // console.log(part.breadcrumb);
    this.NavigationPath(part.breadcrumb);
    if (!part.breadcrumb) {
      return '';
    }
    part.breadcrumb = part.breadcrumb.replace(/{{([^{}]*)}}/g, function (a, b) {
      const r = part.params[b];
      return typeof r === 'string' ? r : a;
    });
    return part.breadcrumb;
  }

  //Form Control
  get currentPassword() { return this.resetPassword.get('currentPassword') as FormControl; }
  get newPassword() { return this.resetPassword.get('newPassword') as FormControl; }
  get confirmPassword() { return this.resetPassword.get('confirmPassword') as FormControl; }

  //Form Group
  resetPassword = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, ]),
    newPassword: new FormControl('', [Validators.required, ]),
    confirmPassword: new FormControl('', [Validators.required, ]),
  });

  forgotPassword(template: TemplateRef<any>) {
    this.resetPassword = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, ]),
      newPassword: new FormControl('', [Validators.required, ]),
      confirmPassword: new FormControl('', [Validators.required, ]),
    });
    this.hide = true;
    this.newPass = true;
    this.dialog.open(template, {
      width: '500px',
      disableClose: true
    });
  }
  onresetPassword() {
    if (this.resetPassword.value.newPassword === this.resetPassword.value.confirmPassword) {
      // console.log(this.resetPassword.value);
      const req = {
        current_password: this.resetPassword.value.currentPassword,
        new_password: this.resetPassword.value.newPassword,
        confirm_password: this.resetPassword.value.confirmPassword,
      }
// console.log(req);
      this.clientAnalyticsService.resetPassword('client/changepassword', req).subscribe(res => {
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
    }else{
      this.snack.open('Please check your new password and confirm password.', null,
        { duration: 5000, verticalPosition: 'top', panelClass: 'error', horizontalPosition: 'center' });
    }
  }

  closePopUp() {
    this.resetPassword = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, ]),
      newPassword: new FormControl('', [Validators.required, ]),
      confirmPassword: new FormControl('', [Validators.required, ]),
    });
    this.hide = true;
    this.newPass = true;
    this.dialog.closeAll();
  }

}