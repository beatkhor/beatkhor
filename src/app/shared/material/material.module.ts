import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

const modules = [
  MatSnackBarModule,
  MatSidenavModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
