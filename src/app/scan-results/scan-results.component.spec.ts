import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { NgxPrintModule } from 'ngx-print';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from '../services/backend.service';
import { HttpClientModule } from '@angular/common/http';

import { ScanResultsComponent } from './scan-results.component';
import { VulnerabilityConfirmationComponent } from './vulnerability-confirmation/vulnerability-confirmation.component';
import { WarningMessageComponent } from '../visual-components/warning-message/warning-message.component';

describe('ScanResultsComponent', () => {
  let component: ScanResultsComponent;
  let fixture: ComponentFixture<ScanResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatDividerModule,
        NgxChartsModule,
        MatTableModule,
        RouterTestingModule,
        MatIconModule,
        NgxPrintModule,
        MatDialogModule,
        HttpClientModule,
      ],
      declarations: [
        ScanResultsComponent,
        VulnerabilityConfirmationComponent,
        WarningMessageComponent,
      ],
      providers: [BackendService, { provide: MAT_DIALOG_DATA, useValue: {} }],
    });
    const mockRouter = TestBed.get(Router);
    spyOn(mockRouter, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          data: [
            {
              deviceNumber: 1,
              deviceName: 'Razer Blade',
              vendorId: 5426,
              productId: 582,
            },
            {
              deviceNumber: 2,
              deviceName: 'HIDI2C Device',
              vendorId: 1267,
              productId: 12454,
            },
          ], // Mock data
        },
      },
    });
    fixture = TestBed.createComponent(ScanResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
