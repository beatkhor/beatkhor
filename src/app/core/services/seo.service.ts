import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { Inject, Injectable } from '@angular/core';

import { MetaTags } from '../models/meta-tags';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private dom: Document,
  ) {
    const img = environment.seo.openGraph.image;

    this.meta.addTag({
      name: 'og:image',
      content: environment.siteURL + img.image,
    });

    this.meta.addTag({
      name: 'og:image:type',
      content: img.type,
    });

    this.meta.addTag({
      name: 'og:image:width',
      content: img.width.toString(),
    });

    this.meta.addTag({
      name: 'og:image:height',
      content: img.height.toString(),
    });
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(metaTags: MetaDefinition[]) {
    metaTags.forEach(m => this.meta.updateTag(m));
  }

  updateTags(meta: MetaTags) {
    if (meta.title) {
      this.title.setTitle([meta.title, environment.seo.siteName].join(' | '));
    } else {
      this.title.setTitle([environment.seo.siteName, environment.seo.siteTitle].join(' | '));
    }

    this.meta.updateTag({
      name: 'og:title',
      content: meta.title || environment.seo.siteTitle,
    });

    this.meta.updateTag({
      name: 'description',
      content:meta.description || environment.seo.siteDescription,
    });

    this.meta.updateTag({
      name: 'robots',
      content: meta.noIndex ? 'noindex' : 'index, follow',
    });

    this.createCanonicalURL();
  }

  createCanonicalURL(url?: string) {
    let canURL = url == undefined ? this.dom.URL : url;
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }
}