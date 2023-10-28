import {createReducer, on} from "@ngrx/store";
import {loginUser} from "./login.actions";


interface loginStore {
  loginForm: {
    email: string,
    password: string
  }
}

const initialState: loginStore = {
  loginForm: {
    email: "",
    password: ""
  }
}

export const loginReducer = createReducer(
  initialState,
  on(loginUser, (state, action) => {
    return state
  })
)
