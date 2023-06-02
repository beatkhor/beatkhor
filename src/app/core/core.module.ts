import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule
  ]
})
export class CoreModule { }
