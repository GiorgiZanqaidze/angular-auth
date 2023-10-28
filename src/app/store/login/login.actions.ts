import {createAction, props} from "@ngrx/store";


export const loginUser = createAction(
  "[Login] user",
  props<{email: string, password: string}>()
)
