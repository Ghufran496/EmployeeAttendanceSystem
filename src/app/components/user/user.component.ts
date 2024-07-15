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
  imports: [CommonModule, ChartsComponent],
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

  getEmployeeSalary(_id: any) {
    this.adminService.getSingleUserAllSalById(_id).subscribe(
      (data) => {
        this.authenticatedEmployeeSalary = data;

        //console.log(this.authenticatedEmployeeSalary);
      },
      (err) => {
        console.log('error', err);
      }
    );
  }

  clockedIn() {
    const storedCheckedIn = localStorage.getItem('CheckedInId');

    if (storedCheckedIn) {
      alert('Already checked In Today, Do check Out first');
      return;
    }

    const userId = this.authService.gettoken().id;
    const currentDate = new Date();
    const checkInTime = currentDate.toISOString();
    const checkOutTime = new Date(
      currentDate.getTime() + 8 * 60 * 60 * 1000
    ).toISOString();

    const newId = this.generateGUID();
    // console.log(newId);

    const checkedInUserInfo = {
      attendanceId: newId,
      EmployeeId: userId,
    };

    localStorage.setItem('CheckedInId', JSON.stringify(checkedInUserInfo));

    const newAttendance = {
      id: newId,
      attendanceDate: currentDate.toISOString(),
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      totalHoursWorked: 8,
      attendanceStatus: 'present',
      userId: userId,
    };
    this.userService.CreateEmployeeAttendance(newAttendance).subscribe(
      (data) => {
        alert('You have successfully marked your attendance for today');
      },
      (err) => {
        console.log('error in marking attendance', err);
      }
    );
  }

  public checkInData?: any;
  public storedemployeeAttendance: any;

  clockedOut() {
    const storedCheckedIn = localStorage.getItem('CheckedInId');

    if (storedCheckedIn) {
      const checkInData = JSON.parse(storedCheckedIn);

      this.adminService.getUserAttenById(checkInData.attendanceId).subscribe(
        (data) => {
          this.storedemployeeAttendance = data;
          console.log(this.storedemployeeAttendance);

          const checkInTime = new Date(
            this.storedemployeeAttendance.checkInTime
          );
          const currentDate = new Date();
          const checkOutTime = currentDate.toISOString();
          const diffInMs = currentDate.getTime() - checkInTime.getTime();
          console.log(currentDate.getTime()+" : "+ checkInTime.getTime());

          const TotalHoursWorked = diffInMs / (1000 * 60 * 60);
          console.log(TotalHoursWorked);

          const updatedAttendance = {
            attendanceDate: this.storedemployeeAttendance.attendanceDate,
            checkInTime: this.storedemployeeAttendance.checkInTime,
            checkOutTime: checkOutTime,
            totalHoursWorked: TotalHoursWorked,
            attendanceStatus: this.storedemployeeAttendance.attendanceStatus,
          };
          console.log(updatedAttendance);
        },
        (err) => {
          console.log('error in fetching attendance', err);
        }
      );
    }

    // if(this.storedemployeeAttendance){
    //   console.log("i am here "+this.storedemployeeAttendance);
    // }

    // const checkInTime = new Date(
    //   this.storedemployeeAttendance.checkInTime
    // );
    // const currentDate = new Date();
    // const checkOutTime = currentDate.toISOString();
    // const diffInMs = currentDate.getTime() - checkInTime.getTime();
    // const TotalHoursWorked = diffInMs / (1000 * 60 * 60);

    // const updatedAttendance = {
    //   attendanceDate: this.storedemployeeAttendance.attendanceDate,
    //   checkInTime: this.storedemployeeAttendance.checkInTime,
    //   checkOutTime: checkOutTime,
    //   totalHoursWorked: TotalHoursWorked,
    //   attendanceStatus: this.storedemployeeAttendance.attendanceStatus,
    // };
    // console.log(updatedAttendance);

    // this.userService.CreateEmployeeAttendance(newAttendance).subscribe(
    //   (data) => {
    //     alert('You have successfully marked your attendance for today');
    //   },
    //   (err) => {
    //     console.log('error in marking attendance', err);
    //   }
    // );
  }

  generateGUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  }
}
