import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SmsTargetsComponent } from './pages/sms-targets/sms-targets.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'users',
    component: UserEditComponent,
    canActivate: [LoggedInGuard, AdminGuard]
  },
  {
    path: 'sms-targets',
    component: SmsTargetsComponent,
    canActivate: [LoggedInGuard, AdminGuard]
  },
  {
    path: '',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
