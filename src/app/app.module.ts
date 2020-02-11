import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageSubscriptionService } from '../app/services/message-subscription.service';
import { LoginComponent } from './forex/login/login.component';
import { DashboardComponent } from './forex/dashboard/dashboard.component';
import { SummaryComponent } from './forex/summary/summary.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [MessageSubscriptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
