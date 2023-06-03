import { Component, Directive, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bk-section-divider',
  templateUrl: './section-divider.component.html',
  styleUrls: ['./section-divider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostGridHeaderComponent {}

@Directive({
  selector: '[bk-section-divider-actions]'
})
export class PostGridHeaderActionsDirective {
  @HostBinding('class') class = 'bk-section-divider__actions';
}

@Directive({
  selector: '[bk-section-divider-title]'
})
export class PostGridHeaderTitleDirective {
  @HostBinding('class') class = 'bk-section-divider__title';
}