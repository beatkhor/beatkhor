import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthContainerComponent } from './shared/auth-container/auth-container.component';
import { AuthContentComponent } from './shared/auth-content/auth-content.component';
import { AuthFooterComponent } from './shared/auth-footer/auth-footer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignInComponent,
    SignupComponent,
    AuthFooterComponent,
    AuthContentComponent,
    AuthContainerComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
