import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BrowsePageComponent } from './browse-page/browse-page.component';
import { SingleTrackComponent } from './track-page/track-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BrowsePageComponent,
    data: {
      seo: {
        title: 'Browse Beats',
      }
    }
  },
  {
    path: 'track/:link',
    component: SingleTrackComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowseRoutingModule { }
