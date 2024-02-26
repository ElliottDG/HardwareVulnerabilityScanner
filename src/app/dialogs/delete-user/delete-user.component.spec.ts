import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { WarningMessageComponent } from 'src/app/visual-components/warning-message/warning-message.component';
import { MatIconModule } from '@angular/material/icon';

import { DeleteUserComponent } from './delete-user.component';

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserComponent, WarningMessageComponent],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatDividerModule,
        MatDialogModule,
        MatIconModule,
      ],
    });
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
