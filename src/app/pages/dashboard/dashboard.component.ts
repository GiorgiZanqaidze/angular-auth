import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../services/api/api.service";
import {Store} from "@ngrx/store";
import {UserRole} from "../../shared/types/user-role";
import {user} from "../../store/user/user.selectors";
import {userStore} from "../../store/user/user.reducer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private api: ApiService,
              private userStore: Store<{user: UserRole}>,
              private router: Router
  ) {
  }

  user$!: UserRole | null


  ngOnInit() {
    this.userStore.select(user).subscribe(user => {
      this.user$ = user
    })
  }

  logOut() {
    this.api.logOut().subscribe(res => {
      this.router.navigate(["/login"])
    })
  }

}
