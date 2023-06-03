import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isSigninOrSignup = state.url === '/authentication/signin' || state.url === '/authentication/signup';
    const token = this.authService.getToken();

    if (isSigninOrSignup) {
      if (token) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    } else {
      if (token) {
        return true;
      } else {
        this.router.navigate(['authentication', 'signin']);
        return false;
      }
    }
  }

}
