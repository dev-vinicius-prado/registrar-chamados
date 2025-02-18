import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CallDetailsComponent } from './components/details/details.component';
import { RegisterCallComponent } from './components/register-call/register-call.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterCallComponent },
  { path: 'details/:id', component: CallDetailsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], // Protege a rota de perfil
  },
  // Adicione outras rotas aqui
];
