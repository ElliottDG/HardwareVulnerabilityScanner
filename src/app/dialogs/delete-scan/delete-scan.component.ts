import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BackendService } from 'src/app/services/backend.service';
import { WarnSnackComponent } from 'src/app/visual-components/warn-snack/warn-snack.component';
import { SuccessMessageComponent } from 'src/app/visual-components/success-message/success-message.component';

@Component({
  selector: 'app-delete-scan',
  templateUrl: './delete-scan.component.html',
  styleUrls: ['./delete-scan.component.scss'],
})
export class DeleteScanComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private backendService: BackendService,
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

  deleteScan(): void {
    this.backendService.delete(`Scan/deleteScan/${this.data.id}`).subscribe({
      next: (data) => {
        window.location.reload();
        this._snackBar.openFromComponent(SuccessMessageComponent, {
          data: ['Scan data deleted!'],
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

export interface DialogData {
  id: number;
}
