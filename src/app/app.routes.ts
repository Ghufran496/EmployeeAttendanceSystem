import { Routes } from '@angular/router';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { SignupComponentComponent } from './components/signup-component/signup-component.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponentComponent },
    { path: 'signup', component: SignupComponentComponent },
    { path: 'user', component: UserComponent },

];
