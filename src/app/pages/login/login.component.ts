import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ApiService} from "../../services/api/api.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {loginStore} from "../../store/login/login.reducer";
import {loginUser, setLoginForm} from "../../store/login/login.actions";
import {apiValidator} from "../../shared/validators/api-validator";
import {LoginService} from "../../services/login/login.service";
import {loginForm} from "../../store/login/login.selectors";
import {LoginForm} from "../../shared/types/login-form";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private loginStore: Store<{login: loginStore}>, private loginService: LoginService) {
    loginStore.select(loginForm).subscribe(form => {
      this.formDataForSubmit = form
    })
  }

  formDataForSubmit!: LoginForm

  loginForm = this.loginService.loginForm

  apiErrors = this.loginService.apiErrors$

  submitLoginData() {
    this.loginStore.dispatch(loginUser(this.formDataForSubmit))
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe((form) => {
      const formData = {email: form.email, password: form.password}
      this.loginStore.dispatch(setLoginForm(formData));
    })
  }

}


