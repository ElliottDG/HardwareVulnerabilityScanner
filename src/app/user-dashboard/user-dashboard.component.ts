import { Component } from '@angular/core';
import { StorageService } from '../auth/storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../dialogs/delete-user/delete-user.component';
import { DeleteAllScansComponent } from '../dialogs/delete-all-scans/delete-all-scans.component';
import { BackendService } from '../services/backend.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { WarnSnackComponent } from '../visual-components/warn-snack/warn-snack.component';
import { DeleteScanComponent } from '../dialogs/delete-scan/delete-scan.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent {
  user: String = 'User';

  isLoggedIn: boolean = false;

  // warn messages
  scanDeletion = 'This is a permanent deletion of scan data!';
  accountDeletion = 'This is a permanent deletion of your account!';

  configError: MatSnackBarConfig = {
    duration: 30000,
    panelClass: ['warn-snackbar'],
  };

  // Table Data
  displayedColumns: string[] = ['scanId', 'scanDate', 'deleteScan'];
  dataSource = [{ scanId: 0, scanDate: '2021-01-01' }];
  resultsLength = 0;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog,
    private backendService: BackendService,
    private _snackBar: MatSnackBar
  ) {}

  ngDoCheck(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigate(['/Login']);
    } else {
      this.user = this.storageService.getUser().email.split('@')[0];
    }
  }

  ngOnInit(): void {
    let scans: any;
    this.backendService
      .get(`Scan/allScans/${this.storageService.getUser().id}`)
      .subscribe({
        next: (data) => {
          this.dataSource = [];
          scans = data;
          for (let s of scans) {
            this.dataSource.push({
              scanId: s.id,
              scanDate: s.ScanDate,
            });
          }
        },
        error: (error) => {
          console.error(error);
          this._snackBar.openFromComponent(WarnSnackComponent, {
            data: ['Error getting scan data!'],
            ...this.configError,
          });
        },
      });
  }

  deleteScan(id: number): void {
    const dialogRef = this.dialog.open(DeleteScanComponent, {
      data: { id: id },
    });
  }

  deleteAllScans(): void {
    const dialogRef = this.dialog.open(DeleteAllScansComponent);
  }

  deleteAccount(): void {
    const dialogRef = this.dialog.open(DeleteUserComponent);
  }
}
