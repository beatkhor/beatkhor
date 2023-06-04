import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomResponse } from '../models/response';
import { Tag } from '../models/tags';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<CustomResponse<Tag[]>> {
    return this.http.get<CustomResponse<Tag[]>>(environment.contentServiceURL + '/tags');
  }

  createTags(tag: Tag): Observable<CustomResponse<Tag>> {
    return this.http.post<CustomResponse<Tag>>(environment.contentServiceURL + '/tags', tag);
  }

  editTags(id: number, tag: Tag): Observable<CustomResponse<Tag>> {
    tag.id = undefined as any;
    return this.http.patch<CustomResponse<Tag>>(environment.contentServiceURL + '/tags/' + id, tag);
  }

  deleteTags(id: number): Observable<CustomResponse<any>> {
    return this.http.delete<CustomResponse<any>>(environment.contentServiceURL + '/tags/' + id);
  }
}
