import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FoodCartService } from '../services/food-cart.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { AlertComponent } from '../shared/alert/alert.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  declarations: [AlertComponent, LoaderComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FoodCartService, AuthGuardService],
  exports: [ HeaderComponent, FooterComponent,
    FormsModule, ReactiveFormsModule,
    HttpClientModule, AlertComponent, LoaderComponent]
})
export class SharedModule { }
