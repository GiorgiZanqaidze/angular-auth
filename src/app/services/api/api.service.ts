import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {userStore} from "../../store/user/user.reducer";
import {setUserData} from "../../store/user/user.actions";
import {UserRole} from "../../shared/types/user-role";
import {LoginForm} from "../../shared/types/login-form";
import {ApiModifiedResponse} from "../../store/login/login.effects";
import {Router} from "@angular/router";

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




  getAuthUser() {
    return this.http.get('/api/user')
      .pipe(map((userData: any) => {
        this.userStore.dispatch(setUserData(userData))
        return userData
      }))
  }


}
