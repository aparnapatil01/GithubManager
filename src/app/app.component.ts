import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { DataService } from '../app/core/services/data.service';
import { IGHUser } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageSize = 5;
  gitHubUsers: any[] = [];
  totalRecords = 0;
  searchResults: any[] = [];
  usersList: any[] = [];

  constructor(private dataService: DataService) {}

  userDetailPromise = obj => this.dataService.getUser(obj.url);

  filterChanged(input: string) {
    this.usersList = [];
    this.gitHubUsers = [];
    this.totalRecords = 0;
    if(!input.trim().length) return;

    this.dataService.searchUsers(input).subscribe((data: IGHUser[])=> {
      if(!data.length) return;
      of(data).pipe(mergeMap(q => forkJoin(...q.map(this.userDetailPromise))))
        .subscribe(usersDetail => {
          this.usersList = usersDetail;
          this.totalRecords = usersDetail.length;
          this.getPagedGitHubUsers(1);
        });
    });
  }

  pageChanged(page: number) {
    this.getPagedGitHubUsers(page);
  }

  getPagedGitHubUsers(page: number) {
    // if no page, start skipVal from zero
    const skipVal = (page-1) * this.pageSize;
    const topVal = skipVal + this.pageSize;
    this.gitHubUsers = this.usersList.slice(skipVal, topVal);
  }

  ngOnInit() {
  }
}