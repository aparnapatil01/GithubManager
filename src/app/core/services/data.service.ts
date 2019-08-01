import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DataService {
  searchUrl = "https://api.github.com/search/users?q=";
  // testUrl = "http://dummy.restapiexample.com/api/v1/employees";

  constructor(private http: HttpClient) { }

  searchUsers(text: string): Observable<HttpResponse<any[]>> {
    return this.http.get<any>(this.searchUrl + text)
        .pipe(
            catchError(this.handleError)
        )
  }

  getUser(url: string) : Observable<HttpResponse<any[]>> {
    return this.http.get<any>(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    } else {
      // Backend error
      console.log(
        `Backend returned message ${error.status}, ` + 
        `body was: ${error.message}`
      );
    }

    return throwError('Something bad happened; please try again later.');
  }
}