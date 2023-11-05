import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor() { }

  signUpForm = new FormGroup({
    "name": new FormControl("", [Validators.required]),
    "email": new FormControl("", [Validators.email, Validators.required]),
    "password": new FormControl("", [Validators.required]),
  })



}
