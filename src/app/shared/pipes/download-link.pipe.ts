import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment';

@Pipe({
    name: 'downloadLink'
})
export class DownloadLinkPipe implements PipeTransform {

    transform(value: string | undefined): string {
        if (!value) {
            return '';
        }

        return environment.storageServiceURL + '/media/download/' + value;
    }

}
