import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { LoginResponseDTO } from '../models/authentication';
import { StorageKeys } from '../models/storage-keys';
import { CustomResponse } from '../models/response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  /**
   * Checks if the user is currently logged in and has a user
   * @returns true if the user is logged in
   */
  isLoggedIn(): boolean {
    return Boolean(this.localStorageService.read(StorageKeys.AuthToken));
  }

  /**
   * Collects the current logged in user data
   * @returns the user data as `User`
   */
  getLoggedInUser(): User {
    return {
      id: Number(this.localStorageService.read(StorageKeys.UserId)),
      first_name: this.localStorageService.read(StorageKeys.UserFirstName) || '',
      last_name: this.localStorageService.read(StorageKeys.UserLastName) || '',
      role_id: Number(this.localStorageService.read(StorageKeys.UserRoleId) || 0),
      username: this.localStorageService.read(StorageKeys.UserUsername) || '',
      nickname: this.localStorageService.read(StorageKeys.UserFirstName) || '',
    };
  }

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
