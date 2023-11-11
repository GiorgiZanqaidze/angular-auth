import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BaseUrlService} from "./services/interceptors/base-url.service";
import {loginReducer} from "./store/login/login.reducer";
import {userReducer} from "./store/user/user.reducer";
import {LoginEffects} from "./store/login/login.effects";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {UIReducer} from "./store/UI/UI.reducer";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      login: loginReducer,
      user: userReducer,
      UI: UIReducer
    }),
    EffectsModule.forRoot([
      LoginEffects
    ]),
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BaseUrlService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
