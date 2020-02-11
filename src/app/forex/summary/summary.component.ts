import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  // summaryRespose: Tranaction;
  // accountNumber: number;
  // userName: string;
  // accountType: string;
  // accountId: number;
  // accountBalance: SuccessResponse;
  // constructor(private http: HttpService) { }


  ngOnInit() {
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



