import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ChartsComponent } from '../charts/charts.component';
import { AdminService } from '../../services/admin.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ChartsComponent, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  UsersData: any;
  authenticatedUserId: any;
  authenticatedEmployeeSalary: any;
  authenticatedEmployeeLeaves: any[] = [];
  isCheckedIn: boolean = false; // State variable for check-in status
  checkInTime?: string;
  checkOutTime?: string;
  buttonDisabled: boolean = false; // State variable for button
  isFormVisible: boolean = false; // State variable for button
  leaveCount = 0;

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

  // ngOnChanges() {
  //   const UserId = this.authenticatedUserId;
  //   this.getEmployeeSalary(UserId);
  //   this.getEmployeeLeave(UserId);
  // }
  ngOnInit() {
    const UserId = this.authenticatedUserId;
    this.getUsers();
    this.getEmployeeSalary(UserId);
    this.getEmployeeLeave(UserId);
    this.loadClockInState();
    this.loadButtonState();
    this.checkForNewDay();
  }

  message = new FormControl('', [Validators.required]);

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.leaveCount = this.authenticatedEmployeeLeaves.length
      ? this.authenticatedEmployeeLeaves.length
      : 0;
    if (this.leaveCount >= 5) {
      alert('Sorry, you have already reached your monthly threshold.');
      return;
    } else {
      this.leaveCount += 1;
      const createLeave = {
        allowedLeaves: this.leaveCount,
        leaveStatus: 'Waiting...',
        reason: this.message.value,
        userId: this.authenticatedUserId,
      };
      this.userService.CreateEmployeeLeave(createLeave).subscribe(
        (data) => {
          alert('You have submitted application for leave...');
          this.message.reset();
          this.getEmployeeLeave(this.authenticatedUserId);
        },
        (err) => {
          console.log('error', err);
        }
      );
    }
  }

  clearForm() {
    this.message.reset();
  }

  getEmployeeLeave(_id: any) {
    this.userService.getSingleUserAllLeaveById(_id).subscribe(
      (data: any) => {
        this.authenticatedEmployeeLeaves = data;
        //console.log(this.authenticatedEmployeeLeaves);
      },
      (err) => {
        console.log('error', err.message);
      }
    );
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
      },
      (err) => {
        console.log('error', err);
      }
    );
  }

  clockedIn() {
    const userId = this.authService.gettoken().id;
    const currentDate = new Date();

    const checkInTime = currentDate;
    const checkOutTime = null;

    // console.log('clockin current date: ' + currentDate);
    // console.log('clockin checkintime: ' + checkInTime);
    // const checkOutTime = new Date(
    //   currentDate.getTime() + 8 * 60 * 60 * 1000
    // ).toISOString();

    const newId = this.generateGUID();

    const checkedInUserInfo = {
      attendanceId: newId,
      EmployeeId: userId,
      checkInTime: checkInTime,
    };

    localStorage.setItem('CheckedInId', JSON.stringify(checkedInUserInfo));
    //localStorage.setItem('checkInTime', checkInTime);
    localStorage.setItem('checkInTime', checkInTime.toISOString());
    localStorage.setItem('lastActionDate', currentDate.toISOString());

    const newAttendance = {
      id: newId,
      attendanceDate: currentDate.toISOString(),
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      totalHoursWorked: 0,
      attendanceStatus: 'present',
      userId: userId,
    };

    this.userService.CreateEmployeeAttendance(newAttendance).subscribe(
      (data) => {
        alert('You have successfully marked your attendance for today');
        this.isCheckedIn = true; // Update state
        this.checkInTime = currentDate.toLocaleString();
        localStorage.setItem('checkInTimeDisplay', this.checkInTime); // Store display time
        this.buttonDisabled = false; // Disable the button
        this.saveButtonState(); // Save the button state
      },
      (err) => {
        console.log('error in marking attendance', err);
      }
    );
  }

  public storedemployeeAttendance: any;

  clockedOut() {
    const storedCheckedIn = localStorage.getItem('CheckedInId');

    if (storedCheckedIn) {
      const checkInData = JSON.parse(storedCheckedIn);

      this.adminService.getUserAttenById(checkInData.attendanceId).subscribe(
        (data) => {
          this.storedemployeeAttendance = data;
          // console.log(
          //   'from database checkintime: ' +
          //     this.storedemployeeAttendance.checkInTime
          // );

          // const checkInTimePST = new Date(
          //   checkInTimeUTC.getTime() + 5 * 60 * 60 * 1000
          // ); // Add 5 hours

          const checkInTimeInitial = new Date(
            this.storedemployeeAttendance.checkInTime
          );

          const checkInTime = new Date(
            checkInTimeInitial.getTime() + 5 * 60 * 60 * 1000
          ); // Add 5 hours

          const currentDate = new Date();
          const checkOutTime = currentDate.toISOString();

          // console.log('current Date: ' + currentDate);
          // console.log('Checkintime: ' + checkInTime);

          let TotalHoursWorked =
            currentDate.getHours() - checkInTime.getHours();

          // console.log(currentDate.getHours() + ' ' + checkInTime.getHours());

          if (TotalHoursWorked == 0 || TotalHoursWorked < 0) {
            TotalHoursWorked = 0;
          }

          const updatedAttendance = {
            attendanceDate: this.storedemployeeAttendance.attendanceDate,
            checkInTime: this.storedemployeeAttendance.checkInTime,
            checkOutTime: checkOutTime,
            totalHoursWorked: TotalHoursWorked,
            attendanceStatus: this.storedemployeeAttendance.attendanceStatus,
          };

          this.userService
            .updateCheckOutTimeEmployee(
              checkInData.attendanceId,
              updatedAttendance
            )
            .subscribe(
              (response) => {
                console.log('Attendance updated successfully:', response);
                alert('Attendance updated successfully');
                this.isCheckedIn = true; // Update state
                this.checkOutTime = currentDate.toLocaleString();
                localStorage.setItem('checkOutTimeDisplay', this.checkOutTime); // Store display time
                this.buttonDisabled = true; // Disable the button
                localStorage.setItem(
                  'lastActionDate',
                  currentDate.toISOString()
                );
                this.saveButtonState(); // Save the button state
              },
              (err) => {
                console.log('Error updating Attendance: ', err);
              }
            );
        },
        (err) => {
          console.log('error in fetching attendance', err);
        }
      );
    }
  }

  toggleClock() {
    if (this.isCheckedIn) {
      this.clockedOut();
    } else {
      this.clockedIn();
    }
  }

  loadClockInState() {
    const storedCheckedIn = localStorage.getItem('CheckedInId');
    this.isCheckedIn = !!storedCheckedIn;

    this.checkInTime = localStorage.getItem('checkInTimeDisplay') || '';
    this.checkOutTime = localStorage.getItem('checkOutTimeDisplay') || '';
  }

  checkForNewDay() {
    const lastActionDate = localStorage.getItem('lastActionDate');
    if (lastActionDate) {
      const lastDate = new Date(lastActionDate);
      const now = new Date();
      if (
        now.getDate() !== lastDate.getDate() ||
        now.getMonth() !== lastDate.getMonth() ||
        now.getFullYear() !== lastDate.getFullYear()
      ) {
        this.resetClockInOut();
      }
    }
  }

  resetClockInOut() {
    this.buttonDisabled = false; // Enable the button at midnight
    this.checkInTime = '';
    this.checkOutTime = '';
    this.isCheckedIn = false; // Update state
    localStorage.removeItem('checkInTimeDisplay');
    localStorage.removeItem('checkOutTimeDisplay');
    localStorage.removeItem('checkInTime');
    localStorage.removeItem('CheckedInId');
    localStorage.removeItem('lastActionDate');
    this.saveButtonState(); // Save the button state
  }

  saveButtonState() {
    localStorage.setItem('buttonDisabled', JSON.stringify(this.buttonDisabled));
  }

  loadButtonState() {
    const storedButtonState = localStorage.getItem('buttonDisabled');
    if (storedButtonState !== null) {
      this.buttonDisabled = JSON.parse(storedButtonState);
    }
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
