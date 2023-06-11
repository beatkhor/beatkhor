import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: 'signin',
    canActivate: [AuthGuard],
    component: SignInComponent,
    data: {
      seo: {
        title_en: $localize`Sign In | Beatkhor`
      }
    }
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    component: SignupComponent,
    data: {
      seo: {
        title_en: $localize`Sign Up | Beatkhor`
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
