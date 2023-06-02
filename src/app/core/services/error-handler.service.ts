import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

import { SnackbarService } from './snackbar.service';

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
      const message: string = err?.error?.message;

      if (Object.keys(this.messages).includes(message)) {
        const msg = this.messages[message];
        if (msg) {
          this.snackbar.error(msg);
        }
      }

    }

    this.snackbar.error('OOps! something went wrong! Please try again later!');
  }
}
