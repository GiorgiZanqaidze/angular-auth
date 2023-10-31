import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {ApiService} from "../services/api/api.service";
import {Store} from "@ngrx/store";
import {userStore} from "../store/user/user.reducer";
import {user} from "../store/user/user.selectors";
import {catchError, Observable, of, pipe} from "rxjs";
import {map} from "rxjs/operators";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {deleteUserData, setUserData} from "../store/user/user.actions";
import {UserRole} from "../shared/types/user-role";
import {HttpClient, HttpContext} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private api: ApiService,
              private userStore: Store<{user: userStore}>,
              private http: HttpClient
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const cookie = document.cookie
    if (!this.api.user && cookie) {
      return this.http.get('/api/user')
        .pipe(
          catchError((err) => {
            return of(err)
          }),
          map((userData) => {
            this.api.user = userData
            this.userStore.dispatch(setUserData(userData))
            if (route.data['requireUserData'] && !userData.error) {
              return true
            } else if (!route.data['requireUserData'] && !userData.error) {
              this.router.navigate(['dashboard']).then()
              return true
            } else if (!route.data['requireUserData'] && userData.error) {
              return true
            } else {
              this.router.navigate(["/login"]).then()
              this.userStore.dispatch(deleteUserData())
              return true
            }
        }))
    }else if(!this.api.user && !route.data['requireUserData'] as boolean) {
      return true
    } else if (this.api.user && !route.data['requireUserData'] as boolean) {
      return false
    } else if (!this.api.user && route.data['requireUserData'] as boolean) {
      return this.router.navigate(['/login'])
    }
    return true
  }
}
