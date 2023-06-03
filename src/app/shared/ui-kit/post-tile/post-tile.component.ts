import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bk-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss']
})
export class PostTileComponent implements OnInit {
  @Input() title = '';
  @Input() image = '';
  @Input() subtitle = '';

  constructor() { }

  ngOnInit(): void {
  }

  get coverAlt() {
    return [this.title, this.subtitle].join(' By ') + 'Cover Art';
  }
}
