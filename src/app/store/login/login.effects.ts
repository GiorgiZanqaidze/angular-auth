import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, finalize, Observable} from "rxjs";
import {loginUser} from "./login.actions";
import {ApiService} from "../../services/api/api.service";
import {map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserRole} from "../../shared/types/user-role";
import {Action, Store} from "@ngrx/store";
import {LoginService} from "../../services/login/login.service";
import {UIStore} from "../UI/UI.reducer";
import {toggleLoadSpinner} from "../UI/UI.actions";


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
              private loginService: LoginService,
              private UIStore: Store<{UI: UIStore}>
  ) {}

  setUserOnLogin$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      exhaustMap(({ email, password }) => {
        return this.apiService.login({ email, password }).pipe(
          map((response: ApiResponse) => {
            const data = response.user
            this.router.navigate(['/dashboard']).then(() => {
              this.loginService.loginForm.reset()
              this.loginService.setApiError(null)
            });
            return { type: "[User] Set User Dat", data }
          }),
          finalize(() => {
            this.UIStore.dispatch(toggleLoadSpinner({toggle: false}))

          }),
          catchError(async (error: HttpErrorResponse): Promise<errorResponse> => {
            this.loginService.setApiError(error.error.message)
            return ({ type: "[Login] Api Error", error })
          }),
        );
      })
    );
  });
}
