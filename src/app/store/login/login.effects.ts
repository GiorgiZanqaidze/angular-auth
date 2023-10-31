import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, Observable, of, tap} from "rxjs";
import {loginUser} from "./login.actions";
import {ApiService} from "../../services/api/api.service";
import {map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserRole} from "../../shared/types/user-role";

import {Action, Store} from "@ngrx/store";
import {userStore} from "../user/user.reducer";


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
              private userStore: Store<{user: userStore}>
  ) {
  }

  setUserOnLogin$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      exhaustMap(({ email, password }) => {
        return this.apiService.login({ email, password }).pipe(
          map((response: ApiResponse) => {
            this.router.navigate(['/dashboard']).then();
            const data = response.user
            return { type: "[User] Delete Data", data }
          }),
          catchError(async (error: HttpErrorResponse): Promise<errorResponse> => ({ type: "[Login] Api Error", error })),
        );
      })
    );
  });



}
