import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForexRoutingModule } from './forex-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './summary/summary.component';


@NgModule({
  declarations: [LoginComponent, DashboardComponent, SummaryComponent],
  imports: [
    CommonModule,
    ForexRoutingModule
  ]
})
export class ForexModule { }
