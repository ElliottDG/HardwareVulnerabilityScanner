import { Component } from '@angular/core';
import { SessionService } from './auth/session/session.service';
import { AuthService } from './auth/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SuccessMessageComponent } from './visual-components/success-message/success-message.component';
import { WarnSnackComponent } from './visual-components/warn-snack/warn-snack.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  isLoggedIn = false;
  username = { id: '', email: '' };

  configSuccess: MatSnackBarConfig = {
    duration: 30000,
    panelClass: ['success-snackbar'],
  };

  configError: MatSnackBarConfig = {
    duration: 30000,
    panelClass: ['warn-snackbar'],
  };

  ngDoCheck(): void {
    this.isLoggedIn = this.sessionService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.sessionService.getUser();
    }
  }

  title = 'Hardware Vulnerability Scanner';

  logout(): void {
    this.sessionService.clean();
    this.username = { id: '', email: '' };
    this.authService.signout().subscribe({
      next: (data) => {
        this._snackBar.openFromComponent(SuccessMessageComponent, {
          data: ['Signed out!'],
          ...this.configSuccess,
        });
      },
      error: (error) => {
        this._snackBar.openFromComponent(WarnSnackComponent, {
          data: [error.error.message],
          ...this.configError,
        });
      },
    });
  }
}
