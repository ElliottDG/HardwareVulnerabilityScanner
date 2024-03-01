import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BackendService } from 'src/app/services/backend.service';
import { WarnSnackComponent } from 'src/app/visual-components/warn-snack/warn-snack.component';
import { SuccessMessageComponent } from 'src/app/visual-components/success-message/success-message.component';
import { DialogData } from './delete-scan.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { WarningMessageComponent } from 'src/app/visual-components/warning-message/warning-message.component';
import { MatIconModule } from '@angular/material/icon';

import { DeleteScanComponent } from './delete-scan.component';

describe('DeleteScanComponent', () => {
  let component: DeleteScanComponent;
  let fixture: ComponentFixture<DeleteScanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeleteScanComponent,
        WarnSnackComponent,
        SuccessMessageComponent,
        WarningMessageComponent,
      ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
      ],
      providers: [
        BackendService,
        MatSnackBar,
        MatSnackBarConfig,
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } },
      ],
    });
    fixture = TestBed.createComponent(DeleteScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
