import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users-attendances',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users-attendances.component.html',
  styleUrl: './users-attendances.component.css',
})
export class UsersAttendancesComponent {
  singleAttendance: any;
  Id = new FormControl('');
  constructor(private adminService: AdminService) {}

  fetchAttendance() {
    this.getSingleUserAttendById(this.Id.value); // Use this.Id.value to get the actual value
  }

  reset() {
    this.Id.reset();
  }

  getSingleUserAttendById(_Id: any) {
    this.adminService.getUserAttenById(_Id).subscribe(
      (data: any) => {
        this.singleAttendance = data;
        console.log(this.singleAttendance);
      },
      (err) => {
        console.log('Error fetching user attendance by Id:', err);
      }
    );
  }
}
