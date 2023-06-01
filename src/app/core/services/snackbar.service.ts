import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  info(message: string, action = '', duration = 6000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: 'info-snackbar-container',
    });
  }

  error(message: string, action = '', duration = 6000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: 'error-snackbar-container'
    });
  }
}
