import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import {ApiService} from "../services/api/api.service";

// Simulate an API call to check if the user is authorized
const simulateAuthorizedUserCheck = (email: string): Observable<boolean> => {
  // You would typically make an HTTP request here to check if the email is authorized
  // For this example, we'll simulate a check with a timer.
  return timer(1000).pipe(map(() => email === 'authorized@example.com'));
};

export function authorizedEmailValidator(api: ApiService): AsyncValidatorFn {
  return (control: AbstractControl):
    | Promise<ValidationErrors | null>
    | Observable<ValidationErrors | null> => {
    const email = control.value;

    // If the control is empty or contains no value, return null (no validation errors).
    if (!email) {
      return of(null);
    }

    return simulateAuthorizedUserCheck(email).pipe(
      switchMap((isAuthorized: boolean) => {
        if (!isAuthorized) {
          // Email is not authorized
          return of({ unauthorizedEmail: true });
        } else {
          // Email is authorized
          return api.login(email).pipe(
            map((availability: any) => {
              if (!availability) {
                return { emailTaken: true };
              } else {
                return null;
              }
            }),
            catchError(() => of(null))
          );
        }
      }),
      catchError(() => of(null)) // Handle errors gracefully, you can customize this part
    );
  };
}
