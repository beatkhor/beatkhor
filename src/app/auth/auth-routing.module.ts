import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { environment } from '@environments/environment';

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
        title: 'Sign in to ' + environment.seo.siteName
      }
    }
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    component: SignupComponent,
    data: {
      seo: {
        title: 'Join Beatkhor' + + environment.seo.siteName,
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
