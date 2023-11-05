import {createAction, props} from "@ngrx/store";



export const toggleLoadSpinner = createAction(
  "[UI] Toggle Load Spinner",
  props<{toggle: boolean}>()
)
