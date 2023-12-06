import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClinicDashboardComponent } from './pages/clinic-dashboard/clinic-dashboard.component';
import { LayoutComponent } from './shared/Components/layout/layout.component';
import { AuthLayoutComponent } from './shared/Components/auth-layout/auth-layout.component';
export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
    ],
  },
  {
    path: 'clinic-dashboard',
    component: LayoutComponent,
    children: [
      { path: '', component: ClinicDashboardComponent }
    ],
  }, 
  // {
  //   path: 'md-dashboard',
  //   component: LayoutComponent,
  //   children: [
  //     { path: '', component: LoginComponent },
  //   ],
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
