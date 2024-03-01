import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/auth/storage.service';
import { BackendService } from 'src/app/services/backend.service';
import { SuccessMessageComponent } from 'src/app/visual-components/success-message/success-message.component';
import { WarnSnackComponent } from 'src/app/visual-components/warn-snack/warn-snack.component';

@Component({
  selector: 'app-delete-all-scans',
  templateUrl: './delete-all-scans.component.html',
  styleUrls: ['./delete-all-scans.component.scss'],
})
export class DeleteAllScansComponent {
  constructor(
    private backendService: BackendService,
    private storageService: StorageService,
    private _snackBar: MatSnackBar
  ) {}

  configSuccess: MatSnackBarConfig = {
    duration: 30000,
    panelClass: ['success-snackbar'],
  };

  configError: MatSnackBarConfig = {
    duration: 30000,
    panelClass: ['warn-snackbar'],
  };

  deleteScans(): void {
    this.backendService
      .delete(`Scan/delete/${this.storageService.getUser().id}`)
      .subscribe({
        next: (data) => {
          this._snackBar.openFromComponent(SuccessMessageComponent, {
            data: ['All scan data deleted!'],
            ...this.configSuccess,
          });
        },
        error: (error) => {
          this._snackBar.openFromComponent(WarnSnackComponent, {
            data: ['Error deleteing scan data!'],
            ...this.configError,
          });
          console.log(error);
        },
      });
  }
}
