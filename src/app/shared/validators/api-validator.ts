import {ValidatorFn} from "@angular/forms";

export function apiValidator(): ValidatorFn {
  return (): { [key: string]: any } => {
    return { customError: true };
  };
}
