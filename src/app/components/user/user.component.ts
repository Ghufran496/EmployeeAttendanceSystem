import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ChartsComponent } from '../charts/charts.component';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,ChartsComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  UsersData: any;
  authenticatedUserId: any;
  authenticatedEmployeeSalary: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private adminService: AdminService
    
  ) {
    this.authenticatedUserId = sessionStorage.getItem('authenticatedUserId');

    if (this.authenticatedUserId === null) {
      this.authenticatedUserId = this.authService.gettoken().id;
      sessionStorage.setItem('authenticatedUserId', this.authenticatedUserId);
    }
  }

  ngOnInit() {
    const UserId = this.authenticatedUserId;
    this.getUsers();
    this.getEmployeeSalary(UserId);
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

        //console.log(this.UsersData);
      },
      (err) => {
        console.log('error', err);
      }
    );
  }

  getEmployeeSalary(_id:any) {
    this.adminService.getSingleUserAllSalById(_id).subscribe(
      (data) => {
        this.authenticatedEmployeeSalary = data;

        console.log(this.authenticatedEmployeeSalary);
      },
      (err) => {
        console.log('error', err);
      }
    );
  }


}
