import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "login",
    loadChildren: () => import("./pages/login/login.module").then(m =>  m.LoginModule),
    canActivate: [AuthGuard],
    data: { requireUserData: false }
  },
  {
    path: "sign-up",
    loadChildren: () => import("./pages/sign-up/sign-up.module").then(m => m.SignUpModule),
    canActivate: [AuthGuard],
    data: { requireUserData: false }
  },
  {
    path: 'dashboard',
    loadChildren: () => import("./pages/dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: { requireUserData: true }
  },
  {
    path: "user-profile",
    loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [AuthGuard],
    data: {requireUserData: true}
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
