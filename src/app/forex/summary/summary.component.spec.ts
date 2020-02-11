import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FoodCartService } from '../../services/food-cart.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { SummaryComponent } from './summary.component';

fdescribe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let api: FoodCartService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockUserService = {
    getApitransactionSummary(data: object) {
      return of({
        statusCode: 200,
        transactionDetails: [{
          fromAccount: 1234567890,
          toAccount: 1234598760,
          transferdAmount: 200,
          transactionDate: new Date(),
          transactionStatus: 'pending'
        }]
      });
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      imports: [SharedModule, PrimengModule, BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: FoodCartService, useValue: mockUserService
        },
        {
          provide: Router, useValue: mockRouter
        }
      ]
    })
      .compileComponents();
    api = TestBed.get(FoodCartService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    const userDetails = {
      customerName: 'Jeyakumar',
      customerId: '51834074'
    };
    sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display account summary list', () => {
    const customerId = JSON.parse(sessionStorage.getItem('currentUser')).customerId;
    component.ngOnInit();
    component.getApitransactionSummary();
    expect(api.getSummary(customerId)).toBeTruthy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
