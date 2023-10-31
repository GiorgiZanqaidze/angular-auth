import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {ApiService} from "../services/api/api.service";
import {Store} from "@ngrx/store";
import {userStore} from "../store/user/user.reducer";
import {user} from "../store/user/user.selectors";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private api: ApiService, private userStore: Store<{user: userStore}>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


    if (!this.api.user) {
      this.api.getAuthUser()
        .subscribe((user) => {
          this.router.navigate(['/dashboard'])
          console.log(this.api.user)
          return true
      }, () => {
        this.router.navigate(['/login'])
        return true
      })
    }

    if (this.api.user && !route.data['requireUserData'] as boolean) {
      return false
    } else {
      return true
    }
  }
}
