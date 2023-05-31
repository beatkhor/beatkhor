import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { LoginResponseDTO } from '../models/authentication';
import { CustomResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  /**
   * Send the credentials and receive the auth token and user profile
   * @param identifier The username or the email
   * @param password  User's password
   * @returns `Observable` login http request
   */
  login(identifier: string, password: string): Observable<CustomResponse<LoginResponseDTO>> {
    return this.http.post<CustomResponse<LoginResponseDTO>>(`${environment.authServiceURL}/auth/login`, { identifier, password });
  }

  /**
   * Clears the current user's authorization token & information
   */
  reset(): void {
    this.localStorageService.clear();
  }
}
