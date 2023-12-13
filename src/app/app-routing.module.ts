import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/auth.guard';
import { ClinicDashboardComponent } from './pages/clinic-dashboard/clinic-dashboard.component';
import { PhysicianComponent } from './pages/physician/physician.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { ChartReviewComponent } from './pages/chart-review/chart-review.component';
import { DocumentComponent } from './pages/document/document.component';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { BillingDashboardComponent } from './pages/billing-dashboard/billing-dashboard.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { PaymentDueComponent } from './pages/payment-due/payment-due.component';
import { NotificationComponent } from './pages/notification/notification.component';
export const APP_ROUTES: Routes = [
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
    // canActivate: [authGuard],
    children: [
      { path: '', component: ClinicDashboardComponent, pathMatch:'full'},
      { path: 'dashboard', component: ClinicDashboardComponent, pathMatch:'full'},
      {
        path:"physician",component: PhysicianComponent, pathMatch:'full'
      },
      {
        path:"conversation",component: ConversationComponent, pathMatch:'full'
      },
      {
        path:"review",component: ChartReviewComponent, pathMatch:'full'
      },
      {
        path:"document",component: DocumentComponent, pathMatch:'full'
      },
      {
        path:"users",component: UserManagerComponent, pathMatch:'full'
      },
      {
        path:"billing",component: BillingDashboardComponent, pathMatch:'full'
      },
      {
        path:"subscription",component: SubscriptionComponent, pathMatch:'full'
      },
      {
        path:"payment",component: PaymentDueComponent, pathMatch:'full'
      },
      {
        path:"notification",component: NotificationComponent, pathMatch:'full'
      },
    ],
  },

      { path: '', loadComponent: () => import('./pages/clinic-dashboard/clinic-dashboard.component').then(x=>x.ClinicDashboardComponent) },
    ]

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
