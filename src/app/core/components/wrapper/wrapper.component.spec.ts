import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

import { SharedModule } from '../../../shared/shared.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { WrapperComponent } from './wrapper.component';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let authMock: AuthService = {
    isLoggedIn: jest.fn(),
    getLoggedInUser: jest.fn().mockReturnValue({}),
    reset: jest.fn(),
  } as any;
  let dialogMock: MatDialog = {
    open: jest.fn().mockReturnValue({
      afterClosed: jest.fn().mockReturnValue({
        subscribe: jest.fn(),
      }),
    })
  } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [WrapperComponent, NavbarComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authMock,
        },
        {
          provide: MatDialog,
          useValue: dialogMock,
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use auth service to check if logged in ', () => {
    component.isLoggedIn;
    expect(authMock.isLoggedIn).toHaveBeenCalled();
  });

  it('should use auth service to get current user ', () => {
    component.user;
    expect(authMock.getLoggedInUser).toHaveBeenCalled();
  });

  it('should toggle menu state', () => {
    component.isSidenavOpen = true;
    component.onMenu();
    expect(component.isSidenavOpen).toBeFalsy();
  });

  it('should open confirm dialog', () => {
    component.onLogout();
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should logout if user response is true', () => {
    component['router'].navigateByUrl = jest.fn();
    component['onLogoutResult'](true);
    expect(authMock.reset).toHaveBeenCalled();
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/');
  });
});
