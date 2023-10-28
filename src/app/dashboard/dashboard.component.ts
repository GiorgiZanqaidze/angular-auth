import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api/api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private api: ApiService) {
  }


  ngOnInit() {
    // this.api.getAuthUser().subscribe(res => console.log(res))
  }


}
