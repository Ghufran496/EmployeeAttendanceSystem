import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-user-salaries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-user-salaries.component.html',
  styleUrl: './single-user-salaries.component.css'
})
export class SingleUserSalariesComponent {

  singleuserAllSalaries: any = [];
  singleuserAllAttendances: any = [];

  constructor(private adminService: AdminService,private route: ActivatedRoute) {}

  ngOnInit() {
    const UserId = this.route.snapshot.paramMap.get('id');
    this.getAllUsersSalaries(UserId);
    this.getAllUsersAttendances(UserId);
  }

  deleteSalary(id:any) {
    this.deleteUserSalById(id); // Use this.Id.value to get the actual value
   
  }

  deleteAttendance(id:any) {
    this.deleteUserAttendById(id); // Use this.Id.value to get the actual value
   
  }
  getAllUsersSalaries(UserId: any) {
    this.adminService.getSingleUserAllSalById(UserId).subscribe(
      (data: any) => {
        this.singleuserAllSalaries = data;
        console.log(this.singleuserAllSalaries);
      },
      (err) => {
        console.log('Error fetching users:', err);
      }
    );
  }

  getAllUsersAttendances(UserId: any) {
    this.adminService.getSingleUserAllAttendById(UserId).subscribe(
      (data: any) => {
        this.singleuserAllAttendances = data;
        console.log(this.singleuserAllAttendances);
      },
      (err) => {
        console.log('Error fetching users:', err);
      }
    );
  }

  deleteUserSalById(_Id: any) {
    this.adminService.delUserSalById(_Id).subscribe(
      (data: any) => {
        alert("Successfully deleted.");
      },
      (err) => {
        console.log('Error deleting user salary by Id:', err);
      }
    );
  }

  deleteUserAttendById(_Id: any) {
    this.adminService.delUserAttendanceById(_Id).subscribe(
      (data: any) => {
        alert("Successfully deleted.");
      },
      (err) => {
        alert("Error deleting user Attendance by Id");
        console.log('Error deleting user Attendance by Id:', err);
      }
    );
  }
}
