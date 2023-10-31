import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {userStore} from "../../store/user/user.reducer";
import {deleteUserData, setUserData} from "../../store/user/user.actions";
import {UserRole} from "../../shared/types/user-role";
import {LoginForm} from "../../shared/types/login-form";
import {ApiModifiedResponse} from "../../store/login/login.effects";
import {Router} from "@angular/router";
import {user} from "../../store/user/user.selectors";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private userStore: Store<{user:userStore}>, private router: Router) { }

  login(loginData: LoginForm): Observable<any> {
    return this.http.get(`/sanctum/csrf-cookie`).pipe(
      switchMap(() => {
        return this.http.post<ApiModifiedResponse>(`/api/login`, loginData);
      })
    );
  }

  getAuthUser(): Observable<UserRole> {
    return this.http.get<UserRole>('/api/user')
      .pipe(map((userData: UserRole) => {
        this.userStore.dispatch(setUserData(userData))
        return userData
      }))
  }

  logOut() {
    return this.http.post('/api/logout', {})
      .pipe(map((res) => {
        this.clearAllCookies()
        console.log(res)
        this.userStore.dispatch(deleteUserData())
        this.router.navigate(["/login"])
      }))
  }

  private clearAllCookies() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
}
