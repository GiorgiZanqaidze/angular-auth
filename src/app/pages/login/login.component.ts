import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {ApiService} from "../../services/api/api.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {loginStore} from "../../store/login/login.reducer";
import {loginUser, setLoginForm} from "../../store/login/login.actions";
import {apiValidator} from "../../shared/validators/api-validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private api: ApiService, private router: Router, private loginStore: Store<{login: loginStore}>) {
  }

  loginForm = new FormGroup({
    "email": new FormControl("", [Validators.email, Validators.required]),
    "password": new FormControl("", [Validators.required])
  })

  apiErrors!: string | null

  submitLoginData() {
    const formData = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }
    this.loginStore.dispatch(loginUser(formData))
    // this.api.login(this.loginForm.value)
    //   .pipe(
    //     catchError((error: HttpErrorResponse) => {
    //       this.loginForm.controls.email.setValidators(apiValidator)
    //       this.loginForm.controls.email.updateValueAndValidity()
    //       this.loginForm.controls.password.setValidators(apiValidator)
    //       this.loginForm.controls.password.updateValueAndValidity()
    //       this.apiErrors = error.error.ERROR
    //       setTimeout(() => {
    //         this.loginForm.controls.email.removeValidators(apiValidator)
    //         this.loginForm.controls.email.updateValueAndValidity()
    //         this.loginForm.controls.password.removeValidators(apiValidator)
    //         this.loginForm.controls.password.updateValueAndValidity()
    //         this.apiErrors = null
    //       }, 4000)
    //       return throwError(error);
    //     })
    //   )
    //   .subscribe((user) => {
    //     this.router.navigate(['dashboard']).catch(err => console.log(err))
    //   })
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe((form) => {
      const formData = {email: form.email, password: form.password}
      this.loginStore.dispatch(setLoginForm(formData));
    })
  }

}


