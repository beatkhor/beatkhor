import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SnackbarService', () => {
  let service: SnackbarService;
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
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('info should call open() from SnackBar', () => {
    service.info('Snackbar');
    expect(snackBarMock.open).toHaveBeenCalled();
  });

  it('error should call open() from SnackBar', () => {
    service.error('Snackbar');
    expect(snackBarMock.open).toHaveBeenCalled();
  });
});
