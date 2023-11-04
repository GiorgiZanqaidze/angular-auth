import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, Observable} from "rxjs";
import {loginUser} from "./login.actions";
import {ApiService} from "../../services/api/api.service";
import {map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserRole} from "../../shared/types/user-role";

import {Action, Store} from "@ngrx/store";
import {userStore} from "../user/user.reducer";
import {LoginService} from "../../services/login/login.service";
import {apiValidator} from "../../shared/validators/api-validator";


export interface ApiResponse {
  user: UserRole
}

export interface ApiModifiedResponse {
  type: string,
  userData: UserRole
}

export interface errorResponse {
  type: string,
  error: HttpErrorResponse
}


@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions,
              private apiService: ApiService,
              private router: Router,
              private userStore: Store<{user: userStore}>,
              private loginService: LoginService
  ) {}

  setUserOnLogin$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      exhaustMap(({ email, password }) => {
        return this.apiService.login({ email, password }).pipe(
          map((response: ApiResponse) => {
            this.router.navigate(['/dashboard']).then();
            const data = response.user
            this.loginService.loginForm.reset()
            this.loginService.setApiError(null)
            return { type: "[User] Set User Dat", data }
          }),
          catchError(async (error: HttpErrorResponse): Promise<errorResponse> => {
            const controls = this.loginService.loginForm.controls
            controls.email.setValidators(apiValidator)
            controls.email.updateValueAndValidity()
            controls.password.setValidators(apiValidator)
            controls.password.updateValueAndValidity()
            this.loginService.loginForm.updateValueAndValidity()
            this.loginService.setApiError(error.error.message)
            setTimeout(() => {
              controls.email.removeValidators(apiValidator)
              controls.email.updateValueAndValidity()
              controls.password.removeValidators(apiValidator)
              controls.password.updateValueAndValidity()
              this.loginService.loginForm.updateValueAndValidity()
            }, 4000)
            return ({ type: "[Login] Api Error", error })
          }),
        );
      })
    );
  });



}
