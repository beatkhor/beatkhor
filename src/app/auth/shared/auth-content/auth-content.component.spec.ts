import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthContentComponent } from './auth-content.component';

describe('AuthContentComponent', () => {
  let component: AuthContentComponent;
  let fixture: ComponentFixture<AuthContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
