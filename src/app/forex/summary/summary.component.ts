import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../services/food-cart.service';
import Swal from 'sweetalert2';
import { TransactionSummary, TransactionHistory } from 'src/app/models/models';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService
  ) { }
  // summaryRespose: Tranaction;
  // accountNumber: number;
  // userName: string;
  // accountType: string;
  // accountId: number;
  // accountBalance: SuccessResponse;
  // constructor(private http: HttpService) { }


  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right bottom, #cfcbc9 ,#ff6200,#ff6200,#cfcbc9) fixed center';
    // this.getApitransactionSummary();
    // this.accountNumber = JSON.parse(sessionStorage.getItem('user')).accountNumber;
    // this.userName = JSON.parse(sessionStorage.getItem('user')).userName;
    // this.accountType = JSON.parse(sessionStorage.getItem('user')).accountType;
    // this.accountId = JSON.parse(sessionStorage.getItem('user')).accountId;
    // this.getBalance();
  }

  // /* Get Api transaction Summary from api and show in the page  */
  // getApitransactionSummary() {
  //   const userid = JSON.parse(sessionStorage.getItem('user')).accountId;
  //   const endpoints = `${EndPoints.TRANSACTION}/${EndPoints.MORTGAGEACCOUNTS}/${userid}`;
  //   this.http.readData(endpoints).subscribe(
  //     (res: any) => {
  //       if (res.statusCode === 200) {
  //         this.summaryRespose = res;
  //       }
  //     }
  //   );
  // }

  // /* Get user Account Balance */
  // getBalance() {
  //   const endpoint = EndPoints.PAYEELIST + '/' + this.accountId + '/balances';
  //   this.http.readData(endpoint).subscribe(
  //     (res: SuccessResponse) => {
  //       if (res.statusCode === 200) {
  //         this.accountBalance = res;
  //       }
  //     }
  //   );

  // }

}



