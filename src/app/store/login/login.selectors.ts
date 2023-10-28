import {createFeatureSelector, createSelector} from "@ngrx/store";
import {loginStore} from "./login.reducer";


const selectLoginState = createFeatureSelector<loginStore>('login')



export const loginForm = createSelector(
    selectLoginState,
    (state) => state.loginForm
);
