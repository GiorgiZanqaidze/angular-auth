import {createFeatureSelector, createSelector} from "@ngrx/store";
import {userStore} from "./user.reducer";


const selectUserState = createFeatureSelector<userStore>('user')



export const user = createSelector(
  selectUserState,
  (state) => state.user
);
