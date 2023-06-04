import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { User } from '../models/user';
import { StorageKeys } from '../models/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private localStorageService: LocalStorageService) { }

  static makeStringUrlSafe(str: string) {
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');
  }

  static abbrTitlesText(source: any[], count: number) {
    if (!source.length) {
      return '';
    }

    let text = '';
    for (let i = 0; i < source.length && i < count; i++) {
      const element = source[i];
      text += element.title;

      if (source.length > 1 && i < (count - 1)) {
        text += ', ';
      }
    }

    if (source.length > count) {
      text += ' and ' + (source.length - count) + ' more';
    }
    return text
  }

  getPostDisplayName(post: Post): string {
    if (post.post_meta.overridden_artist_name) {
      return post.post_meta.overridden_artist_name;
    }

    if (post.user?.nickname) {
      return post.user.nickname;
    }

    return this.getFullName(post.user);
  }

  getFullName(user?: User): string {
    let firstName = '', lastName = '';

    if (!user) {
      firstName = this.localStorageService.read(StorageKeys.UserFirstName) || '';
      lastName = this.localStorageService.read(StorageKeys.UserLastName) || '';
    } else {
      firstName = user.first_name || '';
      lastName = user.last_name || '';
    }

    if (!firstName && !lastName) {
      return this.localStorageService.read(StorageKeys.UserUsername)|| 'N/A';
    }

    return `${firstName || ''} ${lastName || ''}`;
  }
}
