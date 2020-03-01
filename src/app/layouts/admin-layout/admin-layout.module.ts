import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { CreateExpenseCardComponent } from '../../pages/create-expense-card/create-expense-card.component';
import { ExpenseDetailsComponent } from '../../pages/expense-details/expense-details.component'; 
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    ClipboardModule,
    NgxSpinnerModule
  ],
  declarations: [
    DashboardComponent,
    CreateExpenseCardComponent,
    ExpenseDetailsComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
