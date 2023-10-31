import {createAction, props} from "@ngrx/store";
import {LoginForm} from "../../shared/types/login-form";
import {HttpErrorResponse} from "@angular/common/http";


export const loginUser = createAction(
  "[Login] user",
  props<LoginForm>()
)


export const setLoginForm = createAction(
  "[Login] Set Login Form",
  props<LoginForm>()
)

export const setLoginError = createAction(
  "[Login] Api Error",
  props<{error: HttpErrorResponse}>()
)



