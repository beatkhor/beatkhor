import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    data: {
      seo: {
        title_en: 'Sign In | Beatkhor'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
