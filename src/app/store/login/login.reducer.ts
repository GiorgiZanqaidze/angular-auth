import {createReducer, on} from "@ngrx/store";
import {setLoginError, setLoginForm} from "./login.actions";
import {LoginForm} from "../../shared/types/login-form";


export interface loginStore {
  loginForm: LoginForm,
  responseError: string
}

const initialState: loginStore = {
  loginForm: {
    email: "",
    password: ""
  },
  responseError: ""
}

export const loginReducer = createReducer(
  initialState,
  on(setLoginForm, (state, action) => {
    return {...state, loginForm: action}
  }),
  on(setLoginError, (state, action) =>{
    console.log(action.error)
    return state
  })
)
