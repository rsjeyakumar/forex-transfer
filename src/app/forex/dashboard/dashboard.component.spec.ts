import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FoodCartService } from '../../services/food-cart.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let api: FoodCartService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockUserService = {
    isValidUser: false,
    setValidUser: (flag: boolean) => { mockUserService.isValidUser = flag; },
    currentUser: {
      customerName: 'Rabeek',
      customerId: 12345,
    },
    validUser: () => mockUserService.isValidUser,
    loggedUser: () => {
      return mockUserService.currentUser;
    },
    modalConfig: () => ({
      message: '',
      modalShow: ''
    }),
    getAllAccounts(custId: number) {
      return of({
        statusCode: 200,
        message: 'Success',
        accountDetails:
        [{
          accountNumber: 1234567890,
          accountType: 'savings',
          currency: 'INR',
          balance: 9000
        }]
      });
    },
    getCurrency(data: object) {
      return of({
        statusCode: 200,
        toCurrency: 'AUD',
        rate: 20.005
      });
    },
    transferAmount(data: object, userId: number) {
      return of({
        statusCode: 200,
        message: 'AUD'
      });
    }
  };
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [SharedModule, PrimengModule, BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: FoodCartService, useValue: mockUserService
        },
        { provide: FormBuilder, useValue: formBuilder },
        {
          provide: Router, useValue: mockRouter
        }
      ]
    })
      .compileComponents();
    api = TestBed.get(FoodCartService);
    mockRouter = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check ngOnInit Valid User and form creation', () => {
    component.ngOnInit();
    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // if (!api.validUser()) {
    //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    // } else {
    //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    // }
    component.transferForm = formBuilder.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      ammount: ['', Validators.required]
    });
    expect(component.transferForm.valid).toBeFalsy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
  it('should transfer the amount', () => {
    const userData = JSON.parse(sessionStorage.getItem('currentUser'));
    const userId = userData ? userData.customerId : 0;
    const postObj = {
      fromAccount: component.transferForm.value.fromAccount,
      toAccount: component.transferForm.value.toAccount,
      transferAmount: component.transferForm.value.ammount,
    };
    component.transferForm = formBuilder.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      ammount: ['', Validators.required]
    });
    component.transferAmount();
    expect(component.transferForm.valid).toBeFalsy();
    expect(api.transferAmount(postObj, userId)).toBeTruthy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/summary']);
  });
  it('should display all accounts', () => {
    const userData = JSON.parse(sessionStorage.getItem('currentUser'));
    const userId = userData ? userData.customerId : 0;
    component.loader = true;
    component.getAccount();
    expect(api.getAllAccounts(userId)).toBeTruthy();
    expect(component.loader).toBeFalsy();
  });
  it('should check currency', () => {
    const postObj = {
      fromAccount: +component.transferForm.value.fromAccount,
      toAccount: +component.transferForm.value.toAccount
    };
    component.checkCurrency();
    expect(api.getCurrency(postObj)).toBeTruthy();
  });
  it('should return form control', () => {
    component.showBalance = true;
    component.selectedVal(12345);
    component.selectedIndex = 0;
    expect(component.selectedIndex).toBe(0);
  });
  it('should restrict alpha numerics', () => {
    const keyEvent = new KeyboardEvent('keydown', { code: 'KeyA' });
    const spy = spyOn(keyEvent, 'preventDefault');
    component.isNumberKey(keyEvent);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
