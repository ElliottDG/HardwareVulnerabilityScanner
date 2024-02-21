import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { SuccessMessageComponent } from './success-message.component';

describe('SuccessMessageComponent', () => {
  let component: SuccessMessageComponent;
  let fixture: ComponentFixture<SuccessMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessMessageComponent],
      imports: [MatIconModule],
      providers: [
        MatSnackBar,
        MatSnackBarConfig,

        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: ['test'],
        },
        {
          provide: MatSnackBarRef,
          useValue: {},
        },
      ],
    });
    fixture = TestBed.createComponent(SuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
