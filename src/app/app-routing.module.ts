import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { WrapperComponent } from './core/components/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
      },
      {
        path: 'browse',
        loadChildren: () => import('./browse/browse.module').then(m => m.BrowseModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
