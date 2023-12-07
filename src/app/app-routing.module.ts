import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/auth.guard';
export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    loadComponent: () => import('./shared/Components/auth-layout/auth-layout.component').then(x=>x.AuthLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./pages/login/login.component').then(x=>x.LoginComponent) },
      { path: 'forgot-password', loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(x=>x.ForgotPasswordComponent) },
    ],
  },
  {
    path: 'clinic-dashboard',
    loadComponent: () => import('./shared/Components/layout/layout.component').then(x=>x.LayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/clinic-dashboard/clinic-dashboard.component').then(x=>x.ClinicDashboardComponent) },
    ],
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
