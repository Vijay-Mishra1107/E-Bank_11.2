import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./shared/components/layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./shared/components/layouts/auth-layout/auth-layout.component";
import { AuthGuard } from "./shared/guards/auth.guard";

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'sessions/landing',
    pathMatch: 'full'
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "sessions",
        loadChildren: () =>
          import("./views/sessions/sessions.module").then(
            (m) => m.SessionsModule
          ),
        data: { title: "Session" },
      },
    ],
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "analyticsWiproBank",
        loadChildren: () =>
          import("./views/analyticsWiproBank/analyticsWiproBank.module").then(
            (m) => m.analyticsWiproBankModule
          ),
        data: { title: 'analytics-WiproBank', breadcrumb: 'analytics-WiproBank' }
      },
      {
        path: "client-analytics",
        loadChildren: () =>
          import("./views/clientSidePage/clientAnalytics.module").then(
            (m) => m.clientAnalyticsModule
          ),
        data: { title: "client analytics", breadcrumb: "client analytics" },
      },
    ],
  },
  {
    path: "**",
    redirectTo: "sessions/404",
  },
];
