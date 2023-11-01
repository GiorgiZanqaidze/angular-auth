import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { requireUserData: false }
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    canActivate: [AuthGuard],
    data: { requireUserData: false }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { requireUserData: true }
  },
  {
    path: '**',
    redirectTo: "login"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
