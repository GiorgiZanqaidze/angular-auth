import {createReducer} from "@ngrx/store";
import {UserRole} from "../../shared/types/user-role";


const initialState:UserRole = {
  name: "",
    email: "",
    id: null
}

export const userReducer = createReducer(
  initialState,

)
