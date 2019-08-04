import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { IGHUser } from '../../shared/interfaces';

@Injectable()
export class DataService {
  searchUrl = "https://api.github.com/search/users?q=";
  testUrl = "http://dummy.restapiexample.com/api/v1/employees";

  constructor(private http: HttpClient) { }

  searchUsers(text: string): Observable<IGHUser[]> {
    return this.http.get<any>(this.searchUrl + text)
        .pipe(
            map((res) => res.items),
            catchError(this.handleError)
        )
  }

  // searchUsers(text: string): Observable<any[]> {
  //   return this.http.get<any>(this.testUrl)
  //       .pipe(
  //           map((res) => res),
  //           catchError(this.handleError)
  //       )
  // }

  getUser(url: string, score: number) : Observable<IGHUser> {
    return this.http.get<IGHUser>(url)
    .pipe(
      map(res => {
        res.score = score;
        return res;
      }),
      catchError(this.handleError)
    )
  }

  getUserRepos(url: string): Observable<IGHUser[]> {
    return this.http.get<any>(url+'/repos')
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