import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../core/models/user';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(value?: User): string {
    if (!value) {
      return 'Unknown'
    }

    let output = '';
    if (value.first_name) {
      output += value.first_name + ' ';
    }
    if (value.last_name) {
      output += value.last_name + ' ';
    }
    return output;
  }
}
