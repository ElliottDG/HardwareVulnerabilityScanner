import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { WarnSnackComponent } from './warn-snack.component';

describe('WarnSnackComponent', () => {
  let component: WarnSnackComponent;
  let fixture: ComponentFixture<WarnSnackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarnSnackComponent],
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
    fixture = TestBed.createComponent(WarnSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
