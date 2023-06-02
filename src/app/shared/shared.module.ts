import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './dialogs/confirm-dialog';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MaterialModule,
  ]
})
export class SharedModule { }
