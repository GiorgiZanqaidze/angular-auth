import {createReducer, on} from "@ngrx/store";
import {FormControl, FormGroup, Validators} from "@angular/forms";


export interface loginStore {
  loginForm: FormGroup
}

const initialState: loginStore = {
  loginForm: new FormGroup({
    "email": new FormControl("", [Validators.email, Validators.required]),
    "password": new FormControl("", [Validators.required])
  })
}

export const loginReducer = createReducer(
  initialState,
)
