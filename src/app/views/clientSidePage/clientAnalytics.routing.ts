import { Routes } from "@angular/router";

import { clientAnalyticsComponent } from "./clientAnalytics/clientAnalytics.component";
import { clientDashboardComponent } from "./client-dashboard/client-dashboard.component";
import { AllEmiListComponent } from "./all-emi-list/all-emi-list.component";


export const clientAnalytics: Routes = [
  {
    path: "client-analytics-WiproBank",
    component: clientAnalyticsComponent,
    data: { title: 'client-analytics-WiproBank', breadcrumb: 'client-analytics-WiproBank', state : 'client-analytics-WiproBank' }
  },
  {
    path: "client-dashboard-WiproBank",
    component: clientDashboardComponent,
    data: { title: 'client-dashboard-WiproBank', breadcrumb: 'client-dashboard-WiproBank', state : 'client-dashboard-WiproBank' }
  },
  {
    path: "all-loan_EMI",
    component: AllEmiListComponent,
    data: { title: 'all-loan_EMI', breadcrumb: 'all-loan_EMI', state : 'all-loan_EMI' }
  }
];
