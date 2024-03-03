import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { ScanResultsComponent } from './scan-results/scan-results.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WarningMessageComponent } from './visual-components/warning-message/warning-message.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordSnackComponent } from './visual-components/password-snack/password-snack.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadDevicesComponent } from './load-devices/load-devices.component';
import { VulnerabilityConfirmationComponent } from './scan-results/vulnerability-confirmation/vulnerability-confirmation.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './services/http-interceptor';
import { SuccessMessageComponent } from './visual-components/success-message/success-message.component';
import { WarnSnackComponent } from './visual-components/warn-snack/warn-snack.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteUserComponent } from './dialogs/delete-user/delete-user.component';
import { DeleteAllScansComponent } from './dialogs/delete-all-scans/delete-all-scans.component';
import { DeleteScanComponent } from './dialogs/delete-scan/delete-scan.component';
import { NgxPrintModule } from 'ngx-print';
import { AcceptRiskComponent } from './dialogs/accept-risk/accept-risk.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScanResultsComponent,
    NotFoundComponent,
    LoginComponent,
    WarningMessageComponent,
    PasswordSnackComponent,
    UserDashboardComponent,
    LoadDevicesComponent,
    VulnerabilityConfirmationComponent,
    SuccessMessageComponent,
    WarnSnackComponent,
    DeleteUserComponent,
    DeleteAllScansComponent,
    DeleteScanComponent,
    AcceptRiskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatDividerModule,
    NgxChartsModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgxPrintModule,
  ],
  providers: [
    MatIconRegistry,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
