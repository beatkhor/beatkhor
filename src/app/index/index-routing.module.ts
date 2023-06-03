import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      seo: {
        title_en: 'Beatkhor | Publish And Download Beats',
        metaTags_en: [
          {
            name: 'description',
            content: 'Beatkhor is a community based platform to discover, publish and download free beats. Start browsing or upload your beat right now!',
          }
        ]
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
