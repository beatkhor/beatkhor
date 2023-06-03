import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../core/models/post';

@Pipe({
  name: 'postLink'
})
export class PostLinkPipe implements PipeTransform {
  transform(value: Post): string | null {
    if (!value) {
      return null;
    }

    if (value.audios.length === 1) {
      return '/browse/track/' + value.link;
    }

    return '/browse/album/' + value.link;
  }
}
