import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowsePageComponent } from './browse-page/browse-page.component';
import { SingleTrackComponent } from './track-page/track-page.component';
import { BrowseRoutingModule } from './browse-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BrowsePageComponent,
    SingleTrackComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowseRoutingModule,
  ]
})
export class BrowseModule { }
