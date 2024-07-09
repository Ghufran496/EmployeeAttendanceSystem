import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  AllUsersData: any = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.AllUsersData = data.filter((user: { roles: string; }) => user.roles !== 'admin');
        //console.log(this.AllUsersData);
      },
      (err) => {
        console.log('Error fetching users:', err);
      }
    );
  }


}
