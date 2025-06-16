import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { VerificationComponent } from './features/auth/verification/verification.component';
import { ForgotPasswordComponent } from './features/auth/forgot/forgot.component';
import { ResetPasswordComponent } from './features/auth/resetpassword/resetpassword.component';
import { AuthService } from './core/services/auth.service';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent }
      // { path: 'settings', component: DashboardSettingsComponent }, // Example child route
    ]
  },
  // Wildcard route for any other unknown paths
  { path: '**', redirectTo: 'home' }
]; 