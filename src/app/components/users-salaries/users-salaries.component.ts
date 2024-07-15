import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
//36127359-6b07-4a62-a3a0-2d96581321e1
@Component({
  selector: 'app-users-salaries',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users-salaries.component.html',
  styleUrl: './users-salaries.component.css',
})
export class UsersSalariesComponent {
  singleSalary: any;
  Id = new FormControl('');

  constructor(private adminService: AdminService) {}

  fetchSalary() {
    this.getSingleUserSalById(this.Id.value); // Use this.Id.value to get the actual value
  }

  deleteSalary() {
    this.deleteUserSalById(this.Id.value); // Use this.Id.value to get the actual value
    //console.log(this.Id.value)
  }

  reset() {
    this.Id.reset();
  }

  getSingleUserSalById(_Id: any) {
    this.adminService.getUserSalById(_Id).subscribe(
      (data: any) => {
        this.singleSalary = data;
        //console.log(this.singleSalary);
      },
      (err) => {
        console.log('Error fetching user salary by Id:', err);
      }
    );
  }

  deleteUserSalById(_Id: any) {
    this.adminService.delUserSalById(_Id).subscribe(
      (data: any) => {
        this.singleSalary = data;
        //console.log(this.singleSalary);
      },
      (err) => {
        console.log('Error deleting user salary by Id:', err);
      }
    );
  }
}
