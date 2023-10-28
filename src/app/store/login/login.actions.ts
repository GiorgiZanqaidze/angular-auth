import {createAction, props} from "@ngrx/store";


export const loginUser = createAction(
  "[Login] user",
  props<{email: false, password: false}>()
)
