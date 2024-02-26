import { Component } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { BackendService } from 'src/app/services/backend.service';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { SuccessMessageComponent } from 'src/app/visual-components/success-message/success-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  constructor(
    private backendService: BackendService,
    private storageService: StorageService,
    private _snackBar: MatSnackBar
  ) {}

  configSuccess: MatSnackBarConfig = {
    duration: 30000,
    panelClass: ['success-snackbar'],
  };

  deleteUser(): void {
    this.backendService
      .delete(`User/delete/${this.storageService.getUser().id}`)
      .subscribe({
        next: (data) => {
          this._snackBar.openFromComponent(SuccessMessageComponent, {
            data: ['User Deleted!'],
            ...this.configSuccess,
          });
        },
      });
    this.storageService.clean();
  }
}
