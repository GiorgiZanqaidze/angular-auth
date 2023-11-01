import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {userStore} from "../../store/user/user.reducer";
import {deleteUserData} from "../../store/user/user.actions";
import {UserRole} from "../../shared/types/user-role";
import {LoginForm} from "../../shared/types/login-form";
import {ApiModifiedResponse} from "../../store/login/login.effects";
import {Router} from "@angular/router";
import {clearAllCookies} from "../../shared/utilities/clearCookies";
import {SignUpService} from "../sign-up/sign-up.service";
import {SignUpForm} from "../../shared/types/sign-up-form";

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
        return userData
      }))
  }

  logOut() {
    return this.http.post<void>('/api/logout', {})
      .pipe(tap(() => {
        clearAllCookies()
        this.userStore.dispatch(deleteUserData())
      }))
  }

  signUp(signUpData: Partial<SignUpForm>) {
    return this.http.post("/api/register", signUpData)
  }
}
