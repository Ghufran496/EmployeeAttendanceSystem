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

  const protectedRoutes: string[] = [
    '/admin',
    '/user',
    '/usersSalaries',
    '/usersAttendances',
  ];

  return protectedRoutes.includes(state.url) && !authService.isAuthenticated()
    ? router.navigate(['/login'])
    : true;
};

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   if (authService.isAuthenticated()) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
// };
