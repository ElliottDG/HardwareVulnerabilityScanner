import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/auth/storage.service';
import { BackendService } from 'src/app/services/backend.service';
import { SuccessMessageComponent } from 'src/app/visual-components/success-message/success-message.component';
import { WarnSnackComponent } from 'src/app/visual-components/warn-snack/warn-snack.component';

@Component({
  selector: 'app-accept-risk',
  templateUrl: './accept-risk.component.html',
  styleUrls: ['./accept-risk.component.scss'],
})
export class AcceptRiskComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CVEInfo,
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

  acceptRisk(): void {
    console.log(this.data.cve, this.data.scanID);
    const reqData = { cve: this.data.cve, scanId: this.data.scanID };
    this.backendService
      .put(`CVE/UpdateVulnerabilityStatus`, reqData)
      .subscribe({
        next: (data) => {
          this._snackBar.openFromComponent(SuccessMessageComponent, {
            data: ['Risk Accepted!'],
            ...this.configSuccess,
          });
        },
        error: (error) => {
          this._snackBar.openFromComponent(WarnSnackComponent, {
            data: ['Error accepting risk!'],
            ...this.configError,
          });
          console.log(error);
        },
      });
  }
}

export interface CVEInfo {
  cve: string;
  scanID: number;
}
