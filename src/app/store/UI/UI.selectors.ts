import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UIStore} from "./UI.reducer";


const selectUIState = createFeatureSelector<UIStore>('UI')

export const loadSpinner = createSelector(
  selectUIState,
  (state) => state.loadSpinner
)
