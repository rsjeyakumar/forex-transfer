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
    checkLogin(data: object) {
      return of({
        userName: 'Mani',
        userId: 1234
      });
    }
  };
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
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
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!api.validUser()) {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    } else {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
     }
    component.transferForm = formBuilder.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      ammount: ['', Validators.required]
    });
    expect(component.transferForm.valid).toBeFalsy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
