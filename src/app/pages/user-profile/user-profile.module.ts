import { NgModule } from '@angular/core';
import {FormsSharedModule} from "../../shared/modules/forms-shared.module";
import {UserProfileComponent} from "./user-profile.component";
import {UserProfileRoutingModule} from "./user-profile-routing.module";


@NgModule({
  declarations: [
    UserProfileComponent,
  ],
  imports: [
    FormsSharedModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
