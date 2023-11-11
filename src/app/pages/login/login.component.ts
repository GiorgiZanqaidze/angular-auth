import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {LoginService} from "../../services/login/login.service";
import {LoginForm} from "../../shared/types/login-form";
import {loginUser, setLoginForm} from "../../store/login/login.actions";
import {loginStore} from "../../store/login/login.reducer";
import {loginForm} from "../../store/login/login.selectors";
import {toggleLoadSpinner} from "../../store/UI/UI.actions";
import {UIStore} from "../../store/UI/UI.reducer";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private loginStore: Store<{login: loginStore}>,
              private loginService: LoginService,
              private UIStore: Store<{UI: UIStore}>) {
    loginStore.select(loginForm).subscribe(form => {
      this.formDataForSubmit = form
    })
  }

  formDataForSubmit!: LoginForm

  loginForm = this.loginService.loginForm

  apiErrors = this.loginService.apiErrors$

  submitLoginData() {
    this.UIStore.dispatch(toggleLoadSpinner({toggle: true}))
    this.loginStore.dispatch(loginUser(this.formDataForSubmit))
  }


  ngOnInit() {
    this.loginForm.valueChanges
      .pipe(map((form) => {
        const formData = {email: form.email, password: form.password}
        return formData
      }))
      .subscribe((formData) => {
      this.loginStore.dispatch(setLoginForm(formData));
    })
  }
}
