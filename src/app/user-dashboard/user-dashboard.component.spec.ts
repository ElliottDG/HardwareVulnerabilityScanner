import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WarningMessageComponent } from '../visual-components/warning-message/warning-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from '../services/backend.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UserDashboardComponent } from './user-dashboard.component';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDashboardComponent, WarningMessageComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatDividerModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
    });
    fixture = TestBed.createComponent(UserDashboardComponent);
    TestBed.inject(BackendService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
