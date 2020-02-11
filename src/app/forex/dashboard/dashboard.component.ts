import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../services/food-cart.service';
import Swal from 'sweetalert2';
import { AccountReq, AccountsList } from 'src/app/models/models';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  transferForm: FormGroup;
  loader = false;
  allItemList;
  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService
  ) { }

  /*
 * @param
 * Get login form controll access
 */
  get transfer() { return this.transferForm.controls; }

  /*
    * @param event
    * allow numbers only
    */
  isNumberKey(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }
  /*
  * @param Login Validate
  * Validate login form with credentials
  * @input sapId and password
  */
  transferAmount() {
    const userData = JSON.parse(sessionStorage.getItem('currentUser'));
    const userId = userData ? userData.customerId : 0;
    if (this.transferForm.valid) {
      const postObj = {
        fromAccount: +this.transferForm.value.fromAccount,
        toAccount: +this.transferForm.value.toAccount,
        transferAmount: +this.transferForm.value.ammount,
      };
      // tslint:disable-next-line: deprecation
      this.foodService.transferAmount(postObj, userId).subscribe(res => {
        console.log(res);
        Swal.fire(
          'Good job!',
          'Transfer Initiated Successfully',
          'success'
        );
        this.router.navigate(['/summary']);
        this.loader = false;
      }, error => {
        this.loader = false;
      });
    }
  }

  getAccount() {
    const userData = JSON.parse(sessionStorage.getItem('currentUser'));
    const userId = userData ? userData.customerId : 0;
    this.loader = true;
    this.foodService.getAllAccounts(userId).subscribe((res: AccountReq) => {
      console.log(res);
      this.loader = false;
      this.allItemList = res.acccountDetail;
    },
      error => {
        this.loader = false;
      });
  }
  /*
     * @param create form
     * Create form group object for login form
     */
  createForm() {
    this.transferForm = this.formBuilder.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      ammount: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.createForm();
    this.getAccount();
    // tslint:disable-next-line: max-line-length
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right bottom, #cfcbc9 ,#ff6200,#ff6200,#cfcbc9) fixed center';
    if (!this.foodService.validUser()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

}
