import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

const modules = [
  ReactiveFormsModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  FormsModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
