import { MatSnackBar } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';

import { CustomErrorHandler } from './error-handler.service';

describe('CustomErrorHandlerService', () => {
  let service: CustomErrorHandler;
  let snackBarMock = {
    open: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: MatSnackBar,
        useValue: snackBarMock,
      }]
    });
    service = TestBed.inject(CustomErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
