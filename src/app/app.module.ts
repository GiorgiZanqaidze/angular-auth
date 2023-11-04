import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BaseUrlService} from "./services/interceptors/base-url.service";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {loginReducer} from "./store/login/login.reducer";
import {userReducer} from "./store/user/user.reducer";
import {LoginEffects} from "./store/login/login.effects";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      login: loginReducer,
      user: userReducer
    }),
    EffectsModule.forRoot([
      LoginEffects
    ]),
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BaseUrlService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
