import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginForm = new FormGroup({
    "email": new FormControl("", [Validators.email, Validators.required]),
    "password": new FormControl("", [Validators.required])
  })

  private apiErrorsSubject = new BehaviorSubject<string | null>(null);
  apiErrors$: Observable<string | null> = this.apiErrorsSubject.asObservable();

  setApiError(error: string | null) {
    this.apiErrorsSubject.next(error);
  }
}
