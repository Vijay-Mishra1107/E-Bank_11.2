import { SharedMaterialModule } from "app/shared/shared-material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { analyticsWiproBank } from "./analyticsWiproBank.routing";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { AllLoansComponent } from "./allLoans/allLoans.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddNewClientComponent } from "./addNewClient/addNewClient.component";
import { accountManager } from './accountManager/accountManager.component';

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
    RouterModule.forChild(analyticsWiproBank)
  ],
  declarations: [AnalyticsComponent,
    AddNewClientComponent,
    accountManager,
    AllLoansComponent,
  ],
  exports: []
})
export class analyticsWiproBankModule { }
