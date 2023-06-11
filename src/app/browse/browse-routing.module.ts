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
        title_en: $localize`'Browse Beats | Beatkhor'`,
        metaTags_en: [
          {
            name: $localize`description`,
            content: $localize`Browse, discover and download any type of beat for free. The most popular uploaded beat genres are Trap, Drill, Hiphop and Rap.`,
          }
        ]
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
