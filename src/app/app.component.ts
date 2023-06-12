import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

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
    this.checkUserProfile();
    this.setupSeo();
  }

  async checkUserProfile(): Promise<void> {
    if (!this.authService.getToken()) {
      return;
    }

    try {
      const request$ = this.authService.getMe();
      const response = await lastValueFrom(request$);

      if (!response.result.profile_completed) {
        this.router.navigate(['routine', 'complete-profile']);
      }
    } catch (error) {
    }
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
        this.seoService.updateTags(seoData);
      }
    });
  }
}
