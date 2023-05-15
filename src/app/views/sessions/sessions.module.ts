import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from "app/shared/shared-material.module";
import { SharedModule } from '../../shared/shared.module';

import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { MatButtonModule } from "@angular/material/button";

import { landingComponent } from "./landing/landing.component";
import { SigninComponent } from "./signin/signin.component";
import { SessionsRoutes } from "./sessions.routing";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ErrorComponent } from "./error/error.component";


@NgModule({
  declarations: [
    landingComponent,
    SigninComponent,
    NotFoundComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedComponentsModule,
    SharedModule,
    MatButtonModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    RouterModule.forChild(SessionsRoutes),
  ],
})
export class SessionsModule {}
