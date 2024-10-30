import { Routes } from '@angular/router';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { MisionesComponent } from './Components/misiones/misiones.component';
import { WeeklyReportComponent } from './Components/weekly-report/weekly-report.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'misiones', component: MisionesComponent },
    { path: 'report', component: WeeklyReportComponent }
];