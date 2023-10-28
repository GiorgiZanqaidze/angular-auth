import { Component } from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {ApiService} from "../services/api/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  constructor(private api: ApiService, private router: Router) {
  }

  loginForm = new FormGroup({
    "email": new FormControl("", [Validators.email, Validators.required]),
    "password": new FormControl("", [Validators.required])
  })

  apiErrors!: string | null

  submitLoginData() {
    this.api.login(this.loginForm.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.loginForm.controls.email.setValidators(customValidator)
            this.loginForm.controls.email.updateValueAndValidity()
            this.loginForm.controls.password.setValidators(customValidator)
            this.loginForm.controls.password.updateValueAndValidity()
            this.apiErrors = error.error.ERROR
            setTimeout(() => {
              this.loginForm.controls.email.removeValidators(customValidator)
              this.loginForm.controls.email.updateValueAndValidity()
              this.loginForm.controls.password.removeValidators(customValidator)
              this.loginForm.controls.password.updateValueAndValidity()
              this.apiErrors = null
            }, 4000)
          }
          return throwError('An error occurred while processing your request.');
        })
      )
      .subscribe((response) => {
        this.router.navigate(['dashboard']).catch(err => console.log(err))
      })
  }
}

export function customValidator(): ValidatorFn {
  return (): { [key: string]: any } => {
    return { customError: true };
  };
}
