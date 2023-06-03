import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { SeoService } from './core/services/seo.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'bk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.setupSeo();
  }

  private setupSeo() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe(data => {
      let seoData = data['seo'];
      if (seoData) {
        this.seoService.updateTitle(seoData['title_en']);
        this.seoService.updateMetaTags(seoData['metaTags_en'] || []);
      }
    });
  }
}
