import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, Observable, of, tap} from "rxjs";
import {loginUser} from "./login.actions";
import {ApiService} from "../../services/api/api.service";
import {map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserRole} from "../../shared/types/user-role";
import {user} from "../user/user.selectors";
import {setUserData} from "../user/user.actions";
import {Action} from "@ngrx/store";


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

  constructor(private actions$: Actions, private apiService: ApiService, private router: Router) {
  }

  setUserOnLogin$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      exhaustMap(({ email, password }) => {
        return this.apiService.login({ email, password }).pipe(
          map((response: ApiResponse) => {
            return { type: "[User] Set User Data", userData: response.user }
          }),
          tap((userData: ApiModifiedResponse): void => {
            if (userData) {
              this.router.navigate(['/dashboard']).then();
            }
          }),
          catchError(async (error: HttpErrorResponse): Promise<errorResponse> => ({ type: "[Login] Api Error", error })),
        );
      })
    );
  });



}
