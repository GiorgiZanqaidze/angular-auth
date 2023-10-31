import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {userStore} from "../../store/user/user.reducer";
import {setUserData} from "../../store/user/user.actions";
import {UserRole} from "../../shared/types/user-role";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private userStore: Store<{user:userStore}>) { }

  login(loginData: any) {
    return this.http.get(`/sanctum/csrf-cookie`).pipe(
      switchMap(() => {
        return this.http.post(`/api/login`, loginData);
      })
    );
  }



  user!: any

  getAuthUser() {
    return this.http.get('/api/user')
      .pipe(map((userData: any) => {
        this.userStore.dispatch(setUserData(userData))
        return userData
      }))
  }


}
