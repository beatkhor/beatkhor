import { Component, OnInit } from '@angular/core';
import { forkJoin, lastValueFrom } from 'rxjs';

import { trackTileFadeIn } from '../core/animations/track-tile-fade.animation';
import { PostService } from '../core/services/post.service';
import { Post } from '../core/models/post';

@Component({
  selector: 'bk-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [trackTileFadeIn(150)],
})
export class IndexComponent implements OnInit {
  latestRecommendedPost: Post[] = [];
  latestDrillPost: Post[] = [];
  latestTrapPost: Post[] = [];

  pageSize = 10;
  loading = false;
  demoArr = Array(this.pageSize);

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const latestPostReq$ = this.postService.search({ pageSize: this.pageSize, tags: [{ slug: 'recommended' }] });
    const trapPostReq$ = this.postService.search({ pageSize: this.pageSize, genres: [{ slug: 'trap' }] });
    const drillPostReq$ = this.postService.search({ pageSize: this.pageSize, genres: [{ slug: 'drill' }] });
    const req$ = forkJoin([latestPostReq$, trapPostReq$, drillPostReq$]);

    try {
      this.loading = true;
      const [latestResponse, trapPostResponse, drillPostResponse] = await lastValueFrom(req$);
      this.latestRecommendedPost = latestResponse.result;
      this.latestTrapPost = trapPostResponse.result;
      this.latestDrillPost = drillPostResponse.result;
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }
}
