import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostGridHeaderActionsDirective, PostGridHeaderComponent, PostGridHeaderTitleDirective } from './ui-kit/section-divider/section-divider.component';
import { PostGridContainerComponent } from './ui-kit/post-grid-container/post-grid-container.component';
import { PostTileComponent } from './ui-kit/post-tile/post-tile.component';
import { PostGridComponent } from './ui-kit/post-grid/post-grid.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog';
import { DownloadLinkPipe } from './pipes/download-link.pipe';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './footer/footer.component';
import { PostLinkPipe } from './pipes/post-link.pipe';
import { UserNamePipe } from './pipes/user-name.pipe';
import { NavbarOptionDirective } from './ui-kit/navbar-option/navbar-option.directive';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    PostGridContainerComponent,
    PostGridHeaderComponent,
    PostGridHeaderActionsDirective,
    PostGridHeaderTitleDirective,
    PostGridComponent,
    PostTileComponent,
    PostLinkPipe,
    DownloadLinkPipe,
    FooterComponent,
    UserNamePipe,
    NavbarOptionDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    PostGridContainerComponent,
    PostGridHeaderComponent,
    PostGridHeaderActionsDirective,
    PostGridHeaderTitleDirective,
    PostGridComponent,
    PostTileComponent,
    PostLinkPipe,
    DownloadLinkPipe,
    FooterComponent,
    UserNamePipe,
    NavbarOptionDirective,
  ]
})
export class SharedModule { }
