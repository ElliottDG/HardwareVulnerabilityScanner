import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScanResultsComponent } from './scan-results/scan-results.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoadDevicesComponent } from './load-devices/load-devices.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'ScanResults', component: ScanResultsComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'User', component: UserDashboardComponent},
  { path: 'LoadDevices', component: LoadDevicesComponent},
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
