import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackendService } from 'src/app/services/backend.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { DeleteAllScansComponent } from './delete-all-scans.component';
import { WarningMessageComponent } from 'src/app/visual-components/warning-message/warning-message.component';

describe('DeleteAllScansComponent', () => {
  let component: DeleteAllScansComponent;
  let fixture: ComponentFixture<DeleteAllScansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAllScansComponent, WarningMessageComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatDividerModule,
        MatDialogModule,
        MatIconModule,
      ],
    });
    fixture = TestBed.createComponent(DeleteAllScansComponent);
    TestBed.inject(BackendService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
