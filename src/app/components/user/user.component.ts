import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  UsersData: any;
  authenticatedUserId: any;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.authenticatedUserId = sessionStorage.getItem('authenticatedUserId');

    if (this.authenticatedUserId === null) {
      this.authenticatedUserId = this.authService.gettoken().id;
      sessionStorage.setItem('authenticatedUserId', this.authenticatedUserId);
    }
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.UsersData = data;

        const authenticatedUser = this.UsersData.find(
          (user: { id: string }) => user.id === this.authenticatedUserId
        );

        if (authenticatedUser) {
          this.UsersData = [authenticatedUser];
        } else {
          this.UsersData = [];
        }

        console.log(this.UsersData);
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
