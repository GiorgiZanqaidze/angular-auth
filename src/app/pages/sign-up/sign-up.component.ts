import { Component } from '@angular/core';
import {SignUpService} from "../../services/sign-up/sign-up.service";
import {ApiService} from "../../services/api/api.service";
import {Store} from "@ngrx/store";
import {UIStore} from "../../store/UI/UI.reducer";
import {toggleLoadSpinner} from "../../store/UI/UI.actions";
import {catchError, finalize} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private signUpService: SignUpService,
              private apiService: ApiService,
              private UIStore: Store<{UIStore: Store<{UI: UIStore}>}>,
              private router: Router
              )
  {}

  signUpForm = this.signUpService.signUpForm

  submitLoginData() {
    this.UIStore.dispatch(toggleLoadSpinner({toggle: true}))
    this.apiService.signUp(this.signUpService.signUpForm.value)
      .pipe(
        catchError((error) => {
        throw error
      }),
        finalize(() => {
          this.UIStore.dispatch(toggleLoadSpinner({ toggle: false }));
      }))
      .subscribe((res) => {
        this.router.navigate(['/login']).then(() => {
          this.signUpForm.reset()
        })
    })
  }



}
