import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';


import { CustomErrorHandler } from '../../core/services/error-handler.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'bk-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  isLoading = false;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private errHandler: CustomErrorHandler,
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return this.form.markAsTouched();
    }

    try {
      this.form.disable();
      this.isLoading = true;
      const request$ = this.authService.login(this.form.value.username, this.form.value.password);
      const response = await lastValueFrom(request$);

      this.authService.setToken(response.result.token);
      this.authService.putLoggedInUser(response.result.user);
      this.isLoading = false;
      this.form.enable();

      if (!response.result.user.profile_completed) {
        this.router.navigate(['routine', 'complete-profile']);
        return;
      }

      this.router.navigate(['/']);
    } catch (error: any) {
      this.form.enable();
      this.isLoading = false;
      this.errHandler.handle(error);
    }
  }
}
