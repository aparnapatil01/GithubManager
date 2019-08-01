import { Component, OnInit } from '@angular/core';
import { DataService } from '../app/core/services/data.service';

import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  gitHubUsers: any[] = [];

  constructor(private dataService: DataService) {}
  
  filterChanged(input: string) {
    this.users = [];
    this.dataService.searchUsers(input).subscribe(res => {
      res.items.forEach((user) => {
        forkJoin(this.dataService.getUser(user.url))
        .subscribe(res => {
          this.users.push(...res);
        }).add(() => {
          this.gitHubUsers.push(...this.users);
        })
      })
    });
  }

  ngOnInit() {
  }
}