import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'bk-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
  isSidenavOpen = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get user() {
    return this.authService.getLoggedInUser();
  }

  onMenu() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  onLogout() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        title: $localize`Logout`,
        message: $localize`Are you sure about signing out of your account?`
      }
    });

    ref.afterClosed().subscribe(response => this.onLogoutResult(response));
  }

  private onLogoutResult(response: boolean) {
    if (response) {
      this.authService.reset();
      this.router.navigateByUrl('/');
    }
  }
}
