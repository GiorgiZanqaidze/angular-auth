import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(loginData: any) {
    return this.http.get(`/sanctum/csrf-cookie`).pipe(
      switchMap(() => {
        return this.http.post(`/api/login`, loginData);
      })
    );
  }


  authUserObservable = new BehaviorSubject<any>(null)

  user!: any

  initAuthUser(userData: any) {
    this.authUserObservable.next(userData)
  }

  getAuthUser() {
    return this.http.get('/api/user')
      .pipe(map((userData) => {
        this.user = userData
        return userData
      }))
  }


}
