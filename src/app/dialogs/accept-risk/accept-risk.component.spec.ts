import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AcceptRiskComponent } from './accept-risk.component';
import { BackendService } from 'src/app/services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { WarningMessageComponent } from 'src/app/visual-components/warning-message/warning-message.component';
import { MatIconModule } from '@angular/material/icon';

describe('AcceptRiskComponent', () => {
  let component: AcceptRiskComponent;
  let fixture: ComponentFixture<AcceptRiskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptRiskComponent, WarningMessageComponent],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        HttpClientModule,
        MatDividerModule,
        MatIconModule,
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, BackendService],
    });
    fixture = TestBed.createComponent(AcceptRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
