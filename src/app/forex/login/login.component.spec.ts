import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FoodCartService } from '../../services/food-cart.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
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
    component.loginForm = formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    expect(component.loginForm.valid).toBeFalsy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
  it('it shoud validate logged in user', () => {
    const response = {
      customerName: 'Mani',
      customerId: 1234
    };
    const postObj = {
      userName: component.loginForm.controls.username.setValue('rabeek'),
      password: component.loginForm.controls.password.setValue('12345')
    };
    component.validateLogin();
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    expect(api.checkLogin(postObj)).toBeTruthy();
    expect(currentUser).toEqual(response);
    expect(component.loader).toBeFalsy();
  });
});
