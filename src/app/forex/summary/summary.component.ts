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
  customerId: number;

  ngOnInit() {
    this.customerId = JSON.parse(sessionStorage.getItem('currentUser')).customerId;
    this.getApitransactionSummary();
  }

  /* Get Api transaction Summary from api and show in the page  */
  getApitransactionSummary() {
    this.foodService.getSummary(this.customerId).subscribe(
      (res: TransactionHistory) => {
        if (res.statusCode === 200) {
          this.summaryRespose = res.transactionDetails;
        }
      }
    );
  }

}



