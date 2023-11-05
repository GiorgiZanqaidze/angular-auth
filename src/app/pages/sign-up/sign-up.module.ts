import { NgModule } from '@angular/core';
import {FormsSharedModule} from "../../shared/modules/forms-shared.module";
import {SignUpComponent} from "./sign-up.component";
import {SignUpRoutingModule} from "./sign-up-routing.module";



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    FormsSharedModule,
    SignUpRoutingModule
  ]
})
export class SignUpModule { }
