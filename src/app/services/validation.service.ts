import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validatePassword(password: String) : string[] {
    let error: string[] = [];
    if (password.length < 8) {
      error.push("Password must be at least 8 characters long.");
    }
    if (!password.match(/[A-Z]/)) {
      error.push("Password must contain at least one uppercase letter.");
    }
    if (!password.match(/[a-z]/)) {
      error.push("Password must contain at least one lowercase letter.");
    }
    if (!password.match(/[0-9]/)) {
      error.push("Password must contain at least one number.");
    }
    if (!password.match(/[^a-zA-Z\d]/)) {
      error.push("Password must contain at least one special character.");
    }
    return error;
  }

  // TODO: check for existing username
  validateUsername(username: String) : string {
    return "";
  }
}
