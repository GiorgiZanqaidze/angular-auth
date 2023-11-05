import {createReducer, on} from "@ngrx/store";
import {toggleLoadSpinner} from "./UI.actions";

export interface UIStore {
  loadSpinner: boolean
}

const initialState: UIStore = {
  loadSpinner: false
}
export const UIReducer = createReducer(
  initialState,
  on(toggleLoadSpinner, (state, {toggle}) => {
    return {...state, loadSpinner: toggle}
  })
);
