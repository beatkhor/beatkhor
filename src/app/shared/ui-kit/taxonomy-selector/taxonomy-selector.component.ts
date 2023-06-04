import { Component, Directive, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bk-taxonomy-selector',
  templateUrl: './taxonomy-selector.component.html',
  styleUrls: ['./taxonomy-selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaxonomySelectorComponent {}


@Directive({
  selector: '[bk-taxonomy-selector-option]'
})
export class TaxonomySelectorOptionDirective {
  @HostBinding('class') class = 'bk-taxonomy-selector__option';
}