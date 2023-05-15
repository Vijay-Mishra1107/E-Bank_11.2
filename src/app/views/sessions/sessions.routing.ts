import { Routes } from "@angular/router";

import { landingComponent } from "./landing/landing.component";
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { ErrorComponent } from "./error/error.component";


export const SessionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "landing",
        component: landingComponent,
        data: { title: "Landing" },
      },
      {
        path: "signin",
        component: SigninComponent,
        data: { title: "Signin" },
      },
      {
        path: "404",
        component: NotFoundComponent,
        data: { title: "Not Found" },
      },
      {
        path: "error",
        component: ErrorComponent,
        data: { title: "Error" },
      },
    ],
  },
];
