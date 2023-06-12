import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

import { MetaTags } from '../models/meta-tags';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) { }
  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(metaTags: MetaDefinition[]) {
    metaTags.forEach(m => this.meta.updateTag(m));
  }

  updateTags(meta:  MetaTags) {
    if (meta.title) {
      this.title.setTitle([meta.title, environment.seo.siteName].join(' | '));
    } else {
      this.title.setTitle([environment.seo.siteName, environment.seo.siteTitle].join(' | '));
    }
  }
}