import { Routes } from '@angular/router';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { SignupComponentComponent } from './components/signup-component/signup-component.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './guard/auth.guard';
import { restrictGuard } from './guard/restrict.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponentComponent,
    canActivate: [restrictGuard],
  },
  {
    path: 'signup',
    component: SignupComponentComponent,
    canActivate: [restrictGuard],
  },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
];
