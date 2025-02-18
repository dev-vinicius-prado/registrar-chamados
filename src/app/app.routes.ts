import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CallDetailsComponent } from './components/details/details.component';
import { RegisterCallComponent } from './components/register-call/register-call.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ManagerGuard } from './guards/manager.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'register',
    component: RegisterCallComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'details/:id',
    component: CallDetailsComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard, RoleGuard], // Protege a rota de perfil
  },
  {
    path: 'reports',
    component: ProfileComponent,
    canActivate: [AuthGuard, ManagerGuard], 
  },

];
