import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { DataService } from '../app/core/services/data.service';
import { SorterService } from '../app/core/services/sorter.service';
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
  usersList: any[] = [];
  userRepositories: any[] = [];
  status: boolean = false;
  detailCollapseBtnText: string = "Details";
  found: boolean = false;

  constructor(private dataService: DataService, private sorterService: SorterService) {}

  userDetailPromise = obj => this.dataService.getUser(obj.url, obj.score);

  filterChanged(input: string) {
    this.found = false;
    this.status = true;
    this.usersList = [];
    this.gitHubUsers = [];
    this.totalRecords = 0;
    
    if(!input.trim().length) {
      this.status = false;
      return;
    };

    this.dataService.searchUsers(input).subscribe((data: IGHUser[])=> {
      this.status = false;
      if(!data.length) { this.found = true; return};
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
    const skipVal = (page-1) * this.pageSize;
    const topVal = skipVal + this.pageSize;
    this.gitHubUsers = this.usersList.slice(skipVal, topVal);
  }

  getUserRepos(url: string, event) {
    this.userRepositories = [];
    event.target.textContent = event.target.textContent.toLocaleLowerCase() == "details" ? "Collapse" : "Details";

    this.dataService.getUserRepos(url).subscribe(res => {
      this.userRepositories.push(...res);
    });
  }

  orderBy(val) {
    const [prop, direction] = val.split('|');
    if(!this.usersList.length) {return};
    this.usersList = this.sorterService.sortBy(prop, +direction, this.usersList);
    this.getPagedGitHubUsers(1);
  }

  ngOnInit() {
  }
}