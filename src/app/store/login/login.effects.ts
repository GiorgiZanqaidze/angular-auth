import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, Observable, of} from "rxjs";
import {loginUser} from "./login.actions";
import {ApiService} from "../../services/api/api.service";
import {map} from "rxjs/operators";
import {setUserData} from "../user/user.actions";
import {UserRole} from "../../shared/types/user-role";


@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions, private apiService: ApiService ) {
  }


  setUserOnLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      exhaustMap(({email, password}) => {
        return this.apiService.login({email, password}).pipe(
          map((userData: any) => ({type: "[User] Set User Data", userData})),
        )
      })
    )
  })


}