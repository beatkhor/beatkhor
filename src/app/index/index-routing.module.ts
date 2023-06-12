import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      seo: {}
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
