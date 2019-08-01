import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  searchUrl = "https://api.github.com/search/users?q=varun";

  constructor(private http: HttpClient) { }

  searchUsers(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.searchUrl);
  }
}