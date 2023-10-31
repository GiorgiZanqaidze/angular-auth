import {createReducer, on} from "@ngrx/store";
import {UserRole} from "../../shared/types/user-role";
import {deleteUserData, setUserData} from "./user.actions";


export interface userStore {
  user: UserRole | null
}


const initialState:userStore = {
    user: null
}

export const userReducer = createReducer(
  initialState,
  on(setUserData, (state, action) => {
    return {...state, user: {name: action.name, id: action.id, email: action.email}}
  }),
  on(deleteUserData, (state) => {
    return {...state, user: null}
  })
)
