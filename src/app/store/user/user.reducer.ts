import {createReducer, on} from "@ngrx/store";
import {UserRole} from "../../shared/types/user-role";
import {setUserData} from "./user.actions";


export interface userStore {
  user: UserRole
}


const initialState:userStore = {
    user: {
      name: "",
      email: "",
      id: null
    }
}

export const userReducer = createReducer(
  initialState,
  on(setUserData, (state, {name, email, id}) => {

    return {...state, user: {name, email, id}}
  })
)
