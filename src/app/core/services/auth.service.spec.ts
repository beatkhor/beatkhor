import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@environments/environment';
import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { LoginResponseDTO } from '../models/authentication';
import { CustomResponse } from '../models/response';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let localStorageServiceMock: LocalStorageService;

  beforeEach(() => {
    localStorageServiceMock = { clear: jest.fn() } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: LocalStorageService,
        useValue: localStorageServiceMock,
      }],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login using credentials', () => {
    const mockResponse: CustomResponse<LoginResponseDTO> = {
      ok: true,
      code: 200,
      result: {
        token: '',
        user: {
          id: 1,
          first_name: 'First',
          last_name: 'Last',
          role_id: 2,
          status: 3,
          username: 'example',
          profile_completed: false,
        },
      }
    };

    service.login('username', 'password').subscribe(result => {
      expect(JSON.stringify(result)).toBe(JSON.stringify(mockResponse)); 
    });

    const req = httpTestingController.expectOne(environment.authServiceURL + '/auth/login');
    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);
  });

  it('should call clear() from local storage service', () => {
    service.reset();
    expect(localStorageServiceMock.clear).toHaveBeenCalled();
  });
});
