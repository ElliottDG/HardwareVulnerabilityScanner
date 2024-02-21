import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
      declarations: [AppComponent, HomeComponent],
      providers: [MatIconRegistry],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
