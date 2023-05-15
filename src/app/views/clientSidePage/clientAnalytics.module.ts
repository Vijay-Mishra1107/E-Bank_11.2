import { SharedMaterialModule } from "app/shared/shared-material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { clientAnalytics } from "./clientAnalytics.routing";
import { clientAnalyticsComponent } from "./clientAnalytics/clientAnalytics.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { clientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { AllEmiListComponent } from './all-emi-list/all-emi-list.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SharedMaterialModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MatRadioModule,
    MatTabsModule,
    TranslateModule,
    MatAutocompleteModule,
    RouterModule.forChild(clientAnalytics)
  ],
  declarations: [clientAnalyticsComponent, clientDashboardComponent, AllEmiListComponent],
  exports: []
})
export class clientAnalyticsModule { }
