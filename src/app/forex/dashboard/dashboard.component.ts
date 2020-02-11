import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../services/food-cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  transferForm: FormGroup;
  loader = false;
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
     * @param create form
     * Create form group object for login form
     */
  createForm() {
    this.transferForm = this.formBuilder.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      ammount: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.createForm();
    // tslint:disable-next-line: max-line-length
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right bottom, #cfcbc9 ,#ff6200,#ff6200,#cfcbc9) fixed center';
  }

}
