import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { LoadDevicesComponent } from './load-devices.component';
import { WarningMessageComponent } from '../visual-components/warning-message/warning-message.component';

describe('LoadDevicesComponent', () => {
  let component: LoadDevicesComponent;
  let fixture: ComponentFixture<LoadDevicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadDevicesComponent, WarningMessageComponent],
      imports: [
        MatTableModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        HttpClientModule,
      ],
    });
    fixture = TestBed.createComponent(LoadDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
