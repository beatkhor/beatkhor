import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomResponse } from '../models/response';
import { Genre } from '../models/genres';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  getGenres(): Observable<CustomResponse<Genre[]>> {
    return this.http.get<CustomResponse<Genre[]>>(environment.contentServiceURL + '/genres');
  }

  createGenres(genres: Genre): Observable<CustomResponse<Genre>> {
    return this.http.post<CustomResponse<Genre>>(environment.contentServiceURL + '/genres', genres);
  }

  editGenres(id: number, genres: Genre): Observable<CustomResponse<Genre>> {
    genres.id = undefined as any;
    return this.http.patch<CustomResponse<Genre>>(environment.contentServiceURL + '/genres/' + id, genres);
  }

  deleteGenres(id: number): Observable<CustomResponse<Genre>> {
    return this.http.delete<CustomResponse<Genre>>(environment.contentServiceURL + '/genres/' + id);
  }
}
