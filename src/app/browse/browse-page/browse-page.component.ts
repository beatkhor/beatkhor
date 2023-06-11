import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { forkJoin, lastValueFrom } from 'rxjs';

import { trackTileFadeIn } from '../../core/animations/track-tile-fade.animation';
import { GenresService } from '../../core/services/genres.service';
import { TagsService } from '../../core/services/tags.service';
import { PostService } from '../../core/services/post.service';
import { Genre } from '../../core/models/genres';
import { Post } from '../../core/models/post';
import { Tag } from '../../core/models/tags';

@Component({
  selector: 'bk-browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss'],
  animations: [trackTileFadeIn(100)]
})
export class BrowsePageComponent implements OnInit {
  loadingFilters = false;
  posts: Post[] = [];
  loading = false;
  totalPages = 0;
  pageSize = 12;
  page = 0;

  collapsedListLimit = 6;
  genresListSize = this.collapsedListLimit;
  tagsListSize = this.collapsedListLimit;

  isMobileFiltersVisible = false;
  demoArr = Array(this.pageSize);
  genres: Genre[] = [];
  hasFilters = false;
  tags: Tag[] = [];
  params: any = {};
  filters: Map<string, string> = new Map();
  
  constructor(
    private router: Router,
    private tagService: TagsService,
    private postService: PostService,
    private genreService: GenresService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.readParams();
    this.getData();
  }

  private readParams() {
    const params = this.activatedRoute.snapshot.queryParams
    for (const key in params) {
      this.filters.set(key, params[key]);
    }
  }

  async getData(): Promise<void> {
    this.loading = true;
    await this.getTaxonomies();
    this.applyParams();
    this.getPosts();
  }

  async getTaxonomies(): Promise<void> {
    const categoriesReq$ = this.genreService.getGenres();
    const tagsReq$ = this.tagService.getTags();

    const req$ = forkJoin([categoriesReq$, tagsReq$]);

    try {
      this.loadingFilters = true;
      const [genreService, tagsResponse] = await lastValueFrom(req$);
      this.genres = genreService.result;
      this.tags = tagsResponse.result;
      this.loadingFilters = false;
    } catch (error) {
      this.loadingFilters = false;
    }
  }

  private applyParams(): void {
    const genresParam = this.filters.get('genres')?.split(',') || [];
    for (const g of this.genres) {
      if (genresParam.find(p => p === g.slug)) {
        g._selected = true;
      }
    }

    const tagsParam = this.filters.get('tags')?.split(',') || [];
    for (const t of this.tags) {
      if (tagsParam.find(p => p === t.slug)) {
        t._selected = true;
      }
    }
  };

  async getPosts() {
    const page = this.filters.get('page');
    const genres: Genre[] | undefined = this.filters.get('genres')?.split(',').map(g => {
      return { slug: g };
    });
    const tags: Tag[] | undefined = this.filters.get('tags')?.split(',').map(g => {
      return { slug: g };
    });

    const postReq$ = this.postService.search({
      page: page ? +page : 1,
      pageSize: this.pageSize,
      genres,
      tags
    });

    try {
      this.loading = true;
      const response = await lastValueFrom(postReq$);
      this.posts = response.result;
      this.page = response.page;
      this.totalPages = Math.ceil(response.total / response.page_size);
      this.loading = false;
      this.demoArr = this.posts.length < this.pageSize ? Array(this.posts.length) : Array(this.pageSize);
    } catch (error) {
      this.loading = false;
    }

    const newFilter = Object.fromEntries(this.filters);
    Object.keys(newFilter).forEach((k) => {
      if(newFilter[k] == '' || (k == 'page' && newFilter[k] == '1')) {
        delete newFilter[k]
      }
    });

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { ...newFilter },
        replaceUrl: true,
      }
    );
  }

  onPageChange(page: number,) {
    this.filters.set('page', String(page))
    this.getPosts();
  }

  onFiltersChange() {
    const genresFilter = this.genres.filter(g => g._selected).map(g => g.slug).join(',');
    const tagsFilter = this.tags.filter(t => t._selected).map(t => t.slug).join(',');
    this.filters.set('genres', genresFilter);
    this.filters.set('tags', tagsFilter);
    this.updateHasFilters();
    this.getPosts();
  }

  private updateHasFilters() {
    this.hasFilters = false;

    for (const g of [...this.genres, ...this.tags]) {
      if (g._selected) {
        this.hasFilters = true;
        return
      }
    }
  }

  applyFiltersToRoute(genres: Genre[], tags: Tag[], page: number) {
    let filters: any[] = [];

    if (genres.length) {
      filters.push({
        name: 'genres',
        value: genres.map(g => g.slug).join(','),
      });
    }

    if (tags.length) {
      filters.push({
        name: 'tags',
        value: tags.map(t => t.slug).join(','),
      });
    }

    if(page > 1) {
      filters.push({
        name: 'page',
        value: page,
      });
    }

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { ...filters.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {}), },
        replaceUrl: true,
      }
    );
  }

  toggleFiltersVisibility() {
    this.isMobileFiltersVisible = !this.isMobileFiltersVisible;
  }
}

