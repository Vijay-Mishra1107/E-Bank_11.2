import { Routes } from "@angular/router";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { AddNewClientComponent } from "./addNewClient/addNewClient.component";
import { accountManager } from "./accountManager/accountManager.component";
import { AllLoansComponent } from "./allLoans/allLoans.component";

export const analyticsWiproBank: Routes = [
  {
    path: "analytics-WiproBank",
    component: AnalyticsComponent,
    data: { title: 'analytics-WiproBank', breadcrumb: 'analytics-WiproBank', state : 'analytics-WiproBank' }
  },
  {
    path: "allLoans-WiproBank",
    component: AllLoansComponent,
    data: { title: 'allLoans-WiproBank', breadcrumb: 'allLoans-WiproBank', state : 'allLoans-WiproBank' }
  },
  {
    path: "add-new-client",
    component: AddNewClientComponent,
    data: { title: 'add-new-client', breadcrumb: 'add-new-client', state : 'add-new-client' }
  },
  {
    path: "account-manager",
    component: accountManager,
    data: { title: 'account-manager', breadcrumb: 'account-manager', state : 'account-manager' }
  }
];
