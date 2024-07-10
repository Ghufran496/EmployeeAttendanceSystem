import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

const protectedRoutes: RegExp[] = [
  /^\/admin/,
  /^\/user/,
  /^\/usersSalaries(\/.*)?$/,
  /^\/usersAttendances(\/.*)?$/,

];

const isProtectedRoute = protectedRoutes.some((regex) => regex.test(state.url));

return isProtectedRoute && !authService.isAuthenticated()
  ? router.navigate(['/login'])
  : true;
};