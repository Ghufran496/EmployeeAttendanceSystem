import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private UserData?: any;
  public tokenjwt?: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.tokenjwt = sessionStorage.getItem('tokenjwt');
      const userDataString = sessionStorage.getItem('UserData');

      if (userDataString) {
        try {
          this.UserData = JSON.parse(userDataString);
        } catch (error) {
          console.error('Error parsing UserData from session storage', error);
        }
      }

      console.log(this.UserData);
    }
  }

  isAuthenticated() {
    return this.tokenjwt ? true : false;
  }

  gettoken() {
    return this.UserData;
  }

  loginUser(email: string, password: string) {
    const mydata = {
      email: email,
      password: password,
    };

    this.http.post('https://localhost:7262/api/Auth/Login', mydata).subscribe(
      (data) => {
        this.UserData = data;

        if (this.UserData.userRole === 'admin') {
          this.router.navigate(['/admin']);
          sessionStorage.setItem('UserData', JSON.stringify(this.UserData));
        } else {
          this.router.navigate(['/user']);
          sessionStorage.setItem('UserData', JSON.stringify(this.UserData));
        }
        if (this.UserData.jwtToken) {
          sessionStorage.setItem('tokenjwt', this.UserData.jwtToken);
          this.tokenjwt = this.UserData.jwtToken;
        }

        console.log(data);
        console.log('success');
      },
      (err) => {
        console.log('error', err);
      }
    );
  }

  logoutUser() {
    this.tokenjwt = undefined;
    this.UserData = undefined;
    sessionStorage.removeItem('tokenjwt');
    sessionStorage.removeItem('UserData');
    sessionStorage.removeItem('authenticatedUserId');
    this.router.navigate(['/login']);
  }
}

/*import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private UserData?: any;
  public tokenjwt?: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  isAuthenticated() {
    this.tokenjwt = sessionStorage.getItem('tokenjwt');
    return this.tokenjwt ? true : false;
  }

  gettoken() {
    if (isPlatformBrowser(this.platformId)) {
      this.UserData = {
        userRole: sessionStorage.getItem('UserRole'),
      };
    }
    return this.UserData;
  }

  loginUser(email: string, password: string) {
    const mydata = {
      email: email,
      password: password,
    };

    this.http.post('https://localhost:7262/api/Auth/Login', mydata).subscribe(
      (data) => {
        this.UserData = data;

        if (this.UserData.userRole === 'admin') {
          this.router.navigate(['/admin']);
          sessionStorage.setItem('UserRole', this.UserData.userRole);
        } else {
          this.router.navigate(['/user']);
          sessionStorage.setItem('UserRole', this.UserData.userRole);
        }
        if (this.UserData.jwtToken) {
          sessionStorage.setItem('tokenjwt', this.UserData.jwtToken);
          this.tokenjwt = this.UserData.jwtToken;
        }

        console.log(data);
        console.log('success');
      },
      (err) => {
        console.log('error', err);
      }
    );
  }

  logoutUser() {
    this.tokenjwt = undefined;
    sessionStorage.removeItem('tokenjwt');
    this.router.navigate(['/']);
  }
}
*/
