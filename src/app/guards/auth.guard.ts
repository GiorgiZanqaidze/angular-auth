import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {ApiService} from "../services/api/api.service";
import {catchError, Observable, Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private api: ApiService) {}

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
      console.log(this.api.user)
      return false
    } else {
      return true
    }
  }
}
