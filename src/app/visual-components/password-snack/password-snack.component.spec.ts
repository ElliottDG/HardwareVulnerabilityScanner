import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { PasswordSnackComponent } from './password-snack.component';

describe('PasswordSnackComponent', () => {
  let component: PasswordSnackComponent;
  let fixture: ComponentFixture<PasswordSnackComponent>;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordSnackComponent],
      imports: [MatSnackBarModule, MatIconModule],
      providers:[
        MatSnackBarModule,
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: ["test"]
        },
        {
          provide: MatSnackBarRef,
           useValue: {}
        }
      ]
    });
    fixture = TestBed.createComponent(PasswordSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
