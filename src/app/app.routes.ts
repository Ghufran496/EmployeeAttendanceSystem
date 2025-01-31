import { Routes } from '@angular/router';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { SignupComponentComponent } from './components/signup-component/signup-component.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './guard/auth.guard';
import { restrictGuard } from './guard/restrict.guard';
import { UsersSalariesComponent } from './components/users-salaries/users-salaries.component';
import { UsersAttendancesComponent } from './components/users-attendances/users-attendances.component';
import { UpdateSalaryComponent } from './components/update-salary/update-salary.component';
import { UpdateAttendanceComponent } from './components/update-attendance/update-attendance.component';
import { SingleUserSalariesComponent } from './components/single-user-salaries/single-user-salaries.component';
//import { SingleUserAttendancesComponent } from './components/single-user-attendances/single-user-attendances.component';
import { UpdateLeaveComponent } from './components/update-leave/update-leave.component';

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
  { path: 'admin/Salary/:id', component: SingleUserSalariesComponent, canActivate: [authGuard] },
  { path: 'admin/Leave/:id', component: UpdateLeaveComponent, canActivate: [authGuard] },
  { path: 'usersSalaries', component: UsersSalariesComponent, canActivate: [authGuard] },
  { path: 'usersSalaries/Salary/:id', component: UpdateSalaryComponent, canActivate: [authGuard] },
  { path: 'usersAttendances', component: UsersAttendancesComponent, canActivate: [authGuard] },
  { path: 'usersAttendances/Attendance/:id', component: UpdateAttendanceComponent, canActivate: [authGuard] },
];


