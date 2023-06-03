import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bk-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostGridComponent {
  @Input() compact = false;
}
