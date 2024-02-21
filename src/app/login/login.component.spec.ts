import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordSnackComponent } from '../visual-components/password-snack/password-snack.component';
import { WarningMessageComponent } from '../visual-components/warning-message/warning-message.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginFormMock = new FormGroup({
    username: new FormControl<String>(''),
    password: new FormControl<String>(''),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        WarningMessageComponent,
        PasswordSnackComponent,
      ],
      imports: [
        MatCardModule,
        MatSnackBarModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: FormGroup,
          useValue: loginFormMock,
        },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
