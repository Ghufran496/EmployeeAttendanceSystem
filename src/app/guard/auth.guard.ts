// import { inject } from '@angular/core';
// import {
//   CanActivateFn,
//   Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// export const authGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   let userData: any = authService.gettoken();
//   //console.log(userData);

//   // sessionStorage.getItem('UserData');
//   // if (userData) {
//   //   userData = JSON.parse(userData);
//   // } else {
//   //   // If no user data, redirect to login
//   //   router.navigate(['/login']);
//   //   return false;
//   // }

//   const protectedRoutes: { [key: string]: RegExp[] } = {
//     admin: [
//       /^\/admin/,
//       /^\/usersAttendances(\/.*)?$/,
//       /^\/usersSalaries(\/.*)?$/,
//       /^\/admin\/Salary(\/.*)?$/,
//     ],
//     employee: [/^\/user/],
//   };

//   if (userData) {
//     const userRole = userData.userRole;

//     const isEmployee = userRole === 'employee';
//     const isAdmin = userRole === 'admin';

//     const isAccessingAdminRoute = protectedRoutes['admin'].some((regex) =>
//       regex.test(state.url)
//     );
//     const isAccessingEmployeeRoute = protectedRoutes['employee'].some((regex) =>
//       regex.test(state.url)
//     );

//     // Redirect to login if user is not authenticated
//     if (!authService.isAuthenticated()) {
//       router.navigate(['/login']);
//       return false;
//     }

//     // Prevent employees from accessing admin routes
//     if (isEmployee && isAccessingAdminRoute) {
//       router.navigate(['/user']);
//       return false;
//     }

//     // Prevent admins from accessing employee routes
//     if (isAdmin && isAccessingEmployeeRoute) {
//       router.navigate(['/admin']);
//       return false;
//     }
//   }
//   return true;
// };

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

  const userData: any = authService.gettoken();

  const protectedRoutes: { [key: string]: any[] } = {
    admin: [
      
      /^\/admin$/,
      ///^\/admin\/Salary\/\d+$/,
      /^\/admin\/Salary\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      /^\/admin\/Attendance\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      /^\/usersSalaries$/,
      /^\/usersSalaries\/Salary\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      /^\/usersAttendances$/,
      /^\/usersAttendances\/Attendance\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      // /^\/admin\/Attendance\/\d+$/,
      // /^\/usersSalaries$/,
      // /^\/usersSalaries\/Salary\/\d+$/,
      // /^\/usersAttendances$/,
      // /^\/usersAttendances\/Attendance\/\d+$/,
    ],
    employee: [/^\/user/],
  };

  if (userData) {
    const userRole = userData.userRole;

    const isEmployee = userRole === 'employee';
    const isAdmin = userRole === 'admin';

    const isAccessingAdminRoute = protectedRoutes['admin'].some((regex) =>
      regex.test(state.url)
    );

    console.log(isAccessingAdminRoute + 'Admin route');

    // Redirect to login if user is not authenticated
    if (!authService.isAuthenticated()) {
      console.log('User is not authenticated. Redirecting to login.');
      router.navigate(['/login']);
      return false;
    }

    // Prevent employees from accessing admin routes
    if (isEmployee && isAccessingAdminRoute) {
      console.log(
        'Employee is trying to access admin route. Redirecting to user.'
      );
      router.navigate(['/user']);
      return false;
    }

    if (!isAccessingAdminRoute) {
      const isAccessingEmployeeRoute = protectedRoutes['employee'].some(
        (regex) => regex.test(state.url)
      );
      console.log(isAccessingEmployeeRoute + 'employee route');
      // Prevent admins from accessing employee routes
      if (isAdmin && isAccessingEmployeeRoute) {
        console.log(
          'Admin is trying to access employee route. Redirecting to admin.'
        );
        router.navigate(['/admin']);
        return false;
      }
    }
  } else {
    console.log('No user data found. Redirecting to login.');
    router.navigate(['/login']);
    return false;
  }

  return true;
};