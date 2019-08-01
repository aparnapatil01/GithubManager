import { Component, OnInit } from '@angular/core';
import { DataService } from '../app/core/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {

  }

  filterChanged(data: string) {
    this.dataService.searchUsers(data).subscribe(res => {
      console.log(res);
    }, (error) => {
      console.log('Error occured ', error);
    });
  }

  ngOnInit() {
  }
}