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
      nickname: this.localStorageService.read(StorageKeys.UserNickname) || '',
    };
  }

  /**
   * Sets user information in local storage
   * @param user information to be stored
   */
  putLoggedInUser(user: User): void {
    this.localStorageService.write(StorageKeys.UserId, String(user.id));
    this.localStorageService.write(StorageKeys.UserFirstName, user.first_name || '');
    this.localStorageService.write(StorageKeys.UserLastName, user.last_name || '');
    this.localStorageService.write(StorageKeys.UserRoleId, String(user.role_id));
    this.localStorageService.write(StorageKeys.UserUsername, user.username || '');
    this.localStorageService.write(StorageKeys.UserNickname, user.nickname || '');
  }

  /**
   * Set authorization token used for sending http requests
   * @param token received from backend
   */
  setToken(token: string): void {
    this.localStorageService.write(StorageKeys.AuthToken, token);
  }

  /**
   * Read authorization token from storage
   */
  getToken(): string | null {
    return this.localStorageService.read(StorageKeys.AuthToken);
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
   * 
   * @param email Email to be used for registration
   * @param password password to be used for account creation
   * @returns http register request as observable
   */
  register(email: string, password: string): Observable<CustomResponse<void>> {
    return this.http.post<CustomResponse<void>>(`${environment.authServiceURL}/auth/register`, { email, password });
  }

  /**
   * Clears the current user's authorization token & information
   */
  reset(): void {
    this.localStorageService.clear();
  }
}
