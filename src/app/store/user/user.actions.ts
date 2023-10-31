import {createAction, props} from "@ngrx/store";
import {UserRole} from "../../shared/types/user-role";



export const setUserData = createAction(
  "[User] Set User Data",
    props<UserRole>()
)
