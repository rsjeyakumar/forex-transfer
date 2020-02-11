import { Component, OnInit, Renderer2 } from '@angular/core';
import { FoodCartService } from '../../services/food-cart.service';
import { TransactionSummary, TransactionHistory } from 'src/app/models/models';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(
    public foodService: FoodCartService,
    public render: Renderer2
  ) {
    this.render.addClass(document.body, 'gradient');

  }
  summaryRespose: TransactionSummary[];
  accountNumber: number;
  userName: string;
  accountType: string;
  accountId: number;

  ngOnInit() {
    this.getApitransactionSummary();
    // this.accountNumber = JSON.parse(sessionStorage.getItem('user')).accountNumber;
    // this.userName = JSON.parse(sessionStorage.getItem('user')).userName;
    // this.accountType = JSON.parse(sessionStorage.getItem('user')).accountType;
    // this.accountId = JSON.parse(sessionStorage.getItem('user')).accountId;
    // this.getBalance();
  }

  /* Get Api transaction Summary from api and show in the page  */
  getApitransactionSummary() {
    const userid = JSON.parse(sessionStorage.getItem('user')).accountId;
    this.foodService.getSummary(userid).subscribe(
      (res: TransactionHistory) => {
        if (res.statusCode === 200) {
          this.summaryRespose = res.transactionDetails;
        }
      }
    );
  }

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



