import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Intercept the http requests and add the API key to all of them if it exists
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authService: AuthService,
        private snackbar: SnackbarService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        const currentAuthorization = request.headers.get('Authorization');
        if (!currentAuthorization) {
            request = request.clone({
                setHeaders: {
                    Authorization: token ? 'Bearer ' + token : '',
                }
            });
        }
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status == 403) {
                    this.snackbar.error('You need to sign in to access this section!');
                    this.authService.reset();
                    this.router.navigateByUrl('/');
                }

                throw err;
            })
        );
    }
}
