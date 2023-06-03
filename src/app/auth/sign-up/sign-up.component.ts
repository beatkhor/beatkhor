import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { CustomErrorHandler } from '../../core/services/error-handler.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'bk-sign-up',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  isLoading = false;
  done = false;

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
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), confirmValidator]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return this.snackbar.error('Please fill the form with valid information!')
    }

    try {
      this.form.disable();
      this.isLoading = true;
      const request$ = this.authService.register(this.form.value.email, this.form.value.password);
      await lastValueFrom(request$);
      this.isLoading = false;
      this.form.enable();
      this.done = true;
    } catch (error: any) {
      this.form.enable();
      this.isLoading = false;
      if ((error as any)?.error?.message === 'duplicated_entry') {
        return this.snackbar.error('This email is already used by an account!', 'OK');
      }
      this.errHandler.handle(error);
    }
  }
}

function confirmValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = String(control.value || '');
  const original = String(control.parent?.value.password || '')

  if (value === original) {
    return null;
  }

  return { 'passwordMatch': true };
}