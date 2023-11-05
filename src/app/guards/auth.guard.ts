import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {ApiService} from "../services/api/api.service";
import {Store} from "@ngrx/store";
import {userStore} from "../store/user/user.reducer";
import {user} from "../store/user/user.selectors";
import {catchError, Observable, of, pipe} from "rxjs";
import {map} from "rxjs/operators";
import {deleteUserData, setUserData} from "../store/user/user.actions";
import {UserRole} from "../shared/types/user-role";
import {clearAllCookies} from "../shared/utilities/clearCookies"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private api: ApiService,
              private userStore: Store<{user: userStore}>,
  ) {
    this.userStore.select(user).subscribe(res => this.authUser$ = res)
  }
  authUser$!: UserRole | null

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const cookie = document.cookie
    const requiredUserDataOnRoute = route.data['requireUserData'] as boolean

    if (!this.authUser$ && cookie) {
      return this.api.getAuthUser()
        .pipe(
          catchError((err) => {
            return of(err)
          }),
          map((userData) => {
            if (requiredUserDataOnRoute && !userData.error) {
              this.userStore.dispatch(setUserData(userData))
              return true
            } else if (!requiredUserDataOnRoute && !userData.error) {
              this.router.navigate(['dashboard']).then()
              return true
            } else if (!route.data['requireUserData'] && userData.error) {
              clearAllCookies()
              return true
            } else {
              this.router.navigate(["/login"]).then()
              this.userStore.dispatch(deleteUserData())
              return true
            }
        }))
    }else if(!this.authUser$ && !requiredUserDataOnRoute) {
      return true
    } else if (this.authUser$ && !requiredUserDataOnRoute) {
      return false
    } else if (!this.authUser$ && requiredUserDataOnRoute) {
      this.router.navigate(['/login']).then()
      return true
    }
    return true
  }
}
