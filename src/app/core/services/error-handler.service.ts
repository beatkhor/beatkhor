import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SnackbarService } from './snackbar.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler {
  messages = environment.messages as any;
  constructor(private snackbar: SnackbarService) { }

  /**
   * Handles http error messages and opens a snackbar based on it
   * @param err The http error object
   */
  handle(err: HttpErrorResponse) {
    if (err?.error?.message) {
      const message: string = err?.error?.message || '';
      const msg = this.messages[message];

      if (msg) {
        this.snackbar.error('You are not allowed to update super user!');
      }
    }

    this.snackbar.error('OOps! something went wrong! Please try again later!');
  }
}
