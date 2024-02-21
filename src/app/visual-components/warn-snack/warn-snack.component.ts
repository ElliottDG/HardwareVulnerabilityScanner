import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-warn-snack',
  templateUrl: './warn-snack.component.html',
  styleUrls: ['./warn-snack.component.scss'],
})
export class WarnSnackComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}

  snackBarRef = inject(MatSnackBarRef);
}
