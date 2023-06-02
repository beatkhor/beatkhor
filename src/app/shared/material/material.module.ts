import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

const modules = [
  MatSnackBarModule,
  MatIconModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
