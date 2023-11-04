import { Component } from '@angular/core';
import {SignUpService} from "../../services/sign-up/sign-up.service";
import {ApiService} from "../../services/api/api.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private signUpService: SignUpService, private apiService: ApiService) {
  }

  signUpForm = this.signUpService.signUpForm

  submitLoginData() {
    this.apiService.signUp(this.signUpService.signUpForm.value)
      .subscribe((res) => {
        this.signUpForm.reset()
        console.log(this.signUpForm.errors)

        // this.signUpService.signUpForm.updateValueAndValidity()
        Object.keys(this.signUpService.signUpForm.controls).forEach(controlName => {
          const control = this.signUpService.signUpForm.get(controlName);
          control?.markAsUntouched();
        });
    })
  }


}
