import { Component } from '@angular/core';
import {SignUpService} from "../../services/sign-up/sign-up.service";
import {ApiService} from "../../services/api/api.service";

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
    console.log(this.signUpService.signUpForm.value)
    this.apiService.signUp(this.signUpService.signUpForm.value)
      .subscribe(res => {
      console.log(res)
    })
  }


}
