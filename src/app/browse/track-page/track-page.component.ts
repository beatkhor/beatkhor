import { Component, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { trackTileFadeIn } from '../../core/animations/track-tile-fade.animation';
import { CustomErrorHandler } from '../../core/services/error-handler.service';
import { UtilsService } from '../../core/services/utils.service';
import { PostService } from '../../core/services/post.service';
import { SeoService } from '../../core/services/seo.service';
import { Post } from '../../core/models/post';

@Component({
  selector: 'bk-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.scss'],
  animations: [trackTileFadeIn(150)],
})
export class SingleTrackComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  loadingRelatedPosts = false;
  post: Post | undefined;
  loading = false;
  pageSize = 5;
  demoArr = Array(this.pageSize);
  latestRelatedPost: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private postService: PostService,
    private utilsService: UtilsService,
    private errHandler: CustomErrorHandler,
  ) { }

  ngOnInit(): void {
    const subs = this.route.params.subscribe(params => {
      this.getData(params['link']);
    });
    this.subscriptions.add(subs);
  }

  private async getData(link: string) {
    try {
      this.loading = true;
      const req = this.postService.getPostByLink(link);
      const result = await lastValueFrom(req);
      this.post = result.result;

      const firstGenre = this.post.genres[0];
      const postDisplayName = this.utilsService.getPostDisplayName(this.post);
      this.seoService.updateTitle([firstGenre.title + ' beat called ' + this.post.post_meta.title + ' by ' + postDisplayName, 'Beatkhor'].join(' | '));

      if (this.post.genres.length) {
        this.getRelatedPosts(this.post.genres[0].slug);
      }
      
      this.loading = false;
    } catch (error: any) {
      this.errHandler.handle(error);
    }
  }

  private async getRelatedPosts(genreSlug: string | undefined) {
    if (!genreSlug) {
      return;
    }

    const relatedPostReq$ = this.postService.search({ pageSize: this.pageSize, genres: [{ slug: genreSlug }] });

    try {
      this.loadingRelatedPosts = true;
      const relatedPostResponse = await lastValueFrom(relatedPostReq$);
      this.latestRelatedPost = relatedPostResponse.result;
      this.loadingRelatedPosts = false;
    } catch (error) {
      this.loadingRelatedPosts = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
