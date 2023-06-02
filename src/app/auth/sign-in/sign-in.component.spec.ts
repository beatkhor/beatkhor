import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthContainerComponent } from '../shared/auth-container/auth-container.component';
import { AuthContentComponent } from '../shared/auth-content/auth-content.component';
import { AuthFooterComponent } from '../shared/auth-footer/auth-footer.component';
import { SharedModule } from '../../shared/shared.module';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, SharedModule],
      declarations: [
        SignInComponent,
        AuthFooterComponent,
        AuthContentComponent,
        AuthContainerComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
