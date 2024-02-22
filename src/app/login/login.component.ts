import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ValidationService } from '../services/validation.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PasswordSnackComponent } from '../visual-components/password-snack/password-snack.component';
import { AuthService } from '../auth/auth.service';
import { SuccessMessageComponent } from '../visual-components/success-message/success-message.component';
import { WarnSnackComponent } from '../visual-components/warn-snack/warn-snack.component';
import { SessionService } from '../auth/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private sanitizer: DomSanitizer,
    private validator: ValidationService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  title: String = 'Login';
  buttonText: String = 'Login';
  toggleButtonText: String = 'Register';
  registerMode: boolean = false;

  isLoggedIn = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    email: new FormControl<String>(''),
    password: new FormControl<String>(''),
  });

  configError: MatSnackBarConfig = {
    duration: 30000,
    panelClass: ['warn-snackbar'],
  };
  configSuccess: MatSnackBarConfig = {
    duration: 30000,
    panelClass: ['success-snackbar'],
  };

  onLogin(): void {
    // no storing unsafehtml
    if (this.loginForm.value.password) {
      this.sanitizer.sanitize(1, this.loginForm.value.password);
    }
    if (this.loginForm.value.email) {
      this.sanitizer.sanitize(1, this.loginForm.value.email);
    }

    if (this.registerMode) {
      if (this.loginForm.value.password && this.loginForm.value.email) {
        let validateErrors = this.validator.validatePassword(
          this.loginForm.value.password as string
        );

        if (validateErrors.length > 0) {
          this._snackBar.openFromComponent(PasswordSnackComponent, {
            data: validateErrors,
            ...this.configError,
          });
        } else {
          // register user
          this.authService
            .signup(
              this.loginForm.value.email as string,
              this.loginForm.value.password as string
            )
            .subscribe({
              next: (data) => {
                this._snackBar.openFromComponent(SuccessMessageComponent, {
                  data: ['User registered! Please login to continue.'],
                  ...this.configSuccess,
                });
                this.loginForm.reset();
              },
              error: (error) => {
                console.error(error);
                this._snackBar.openFromComponent(WarnSnackComponent, {
                  data: [error.error.message],
                  ...this.configError,
                });
              },
            });
        }
      } else {
        this._snackBar.openFromComponent(WarnSnackComponent, {
          data: ['Please enter a valid email and password.'],
          ...this.configError,
        });
      }
    } else {
      if (this.loginForm.value.password && this.loginForm.value.email) {
        // login user
        this.authService
          .signin(
            this.loginForm.value.email as string,
            this.loginForm.value.password as string
          )
          .subscribe({
            next: (data) => {
              this.sessionService.saveUser(data);
              this.isLoginFailed = false;
              this.isLoggedIn = true;

              this._snackBar.openFromComponent(SuccessMessageComponent, {
                data: ['User logged in!'],
                ...this.configSuccess,
              });
              this.loginForm.reset();
            },
            error: (error) => {
              console.error(error);
              this.isLoginFailed = true;
              this._snackBar.openFromComponent(WarnSnackComponent, {
                data: [error.error.message],
                ...this.configError,
              });
            },
          });
      } else {
        this._snackBar.openFromComponent(WarnSnackComponent, {
          data: ['Please enter a valid email and password.'],
          ...this.configError,
        });
      }
    }
  }

  registerToggle(): void {
    this.registerMode = !this.registerMode;
    if (!this.registerMode) {
      this.title = 'Login';
      this.buttonText = 'Login';
      this.toggleButtonText = 'Register';
    } else {
      this.title = 'Register';
      this.buttonText = 'Register';
      this.toggleButtonText = 'Login';
    }
    this.loginForm.reset();
  }
}
