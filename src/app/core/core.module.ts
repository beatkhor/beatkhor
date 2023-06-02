import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { WrapperComponent } from './components/wrapper/wrapper.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavbarComponent,
    WrapperComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule
  ]
})
export class CoreModule { }
