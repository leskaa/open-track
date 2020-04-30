import { AbstractControl } from '@angular/forms';

// This should also check password requirements and make sure the username is unique
export class PasswordValidator {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    if (AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
      let verifyPassword = AC.get('confirmPassword').value;
      if (password != verifyPassword) {
        AC.get('confirmPassword').setErrors({MatchPassword: true});
      } else {
        return null;
      }
    }
  }
}
