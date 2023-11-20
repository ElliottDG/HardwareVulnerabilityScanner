import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-snack',
  templateUrl: './password-snack.component.html',
  styleUrls: ['./password-snack.component.scss']
})
export class PasswordSnackComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  snackBarRef = inject(MatSnackBarRef);

}
