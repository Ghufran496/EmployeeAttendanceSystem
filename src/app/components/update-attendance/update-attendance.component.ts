import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-attendance',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-attendance.component.html',
  styleUrl: './update-attendance.component.css',
})
export class UpdateAttendanceComponent {
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  attendanceDate = new FormControl('');
  checkInTime = new FormControl('');
  checkOutTime = new FormControl('');
  totalHoursWorked = new FormControl('');
  attendanceStatus = new FormControl('');

  updateAttendanceForm = new FormGroup({
    attendanceDate: this.attendanceDate,
    checkInTime: this.checkInTime,
    checkOutTime: this.checkOutTime,
    totalHoursWorked: this.totalHoursWorked,
    attendanceStatus: this.attendanceStatus,
  });

  ngOnInit() {
    const attendanceId = this.route.snapshot.paramMap.get('id');
    this.adminService.getUserAttenById(attendanceId).subscribe(
      (data: any) => {
        //console.log(data.attendanceDate, data.checkInTime, data.checkOutTime);

        const datePart = new Date(data.attendanceDate);
        const timeInPart = new Date(data.checkInTime);
        const timeOutPart = new Date(data.checkOutTime);

        // Format date and time parts
        const formattedDate = this.formatDate(datePart);
        const formattedCheckInTime = this.formatTime(timeInPart);
        const formattedCheckOutTime = this.formatTime(timeOutPart);

        this.updateAttendanceForm.patchValue({
          attendanceDate: formattedDate,
          checkInTime: formattedCheckInTime,
          checkOutTime: formattedCheckOutTime,
          totalHoursWorked: data.totalHoursWorked,
          attendanceStatus: data.attendanceStatus,
        });
        console.log(data);
      },
      (err) => {
        console.log('Error fetching user salary by Id:', err);
      }
    );
  }

  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${this.padNumber(
      date.getMonth() + 1
    )}-${this.padNumber(date.getDate())}`;
  }

  // Helper function to format time as HH:mm
  private formatTime(time: Date): string {
    return `${this.padNumber(time.getHours())}:${this.padNumber(
      time.getMinutes()
    )}`;
  }

  // Helper function to pad numbers with leading zeros
  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  onReset() {
    this.updateAttendanceForm.reset();
  }

  onSubmit() {
    if (this.updateAttendanceForm.valid) {
      console.log(
        this.updateAttendanceForm.value.attendanceDate,
        this.updateAttendanceForm.value.checkInTime,
        this.updateAttendanceForm.value.checkOutTime
      );

      const {
        attendanceDate,
        checkInTime,
        checkOutTime,
        totalHoursWorked,
        attendanceStatus,
      } = this.updateAttendanceForm.value;

      const formattedAttendanceDate = this.formatDateTimeString(
        attendanceDate,
        '00:00:00'
      );
      const formattedCheckInTime = this.formatDateTimeString(
        attendanceDate,
        checkInTime
      ); // Use attendanceDate for checkInTime
      const formattedCheckOutTime = this.formatDateTimeString(
        attendanceDate,
        checkOutTime
      ); // Use attendanceDate for checkOutTime

      console.log(
        formattedAttendanceDate,
        +' ',
        formattedCheckInTime,
        +' ',
        formattedCheckOutTime
      );
      // Construct updated attendance object
      const updatedAttendance = {
        attendanceDate: formattedAttendanceDate,
        checkInTime: formattedCheckInTime,
        checkOutTime: formattedCheckOutTime,
        totalHoursWorked,
        attendanceStatus,
      };
      const attendanceId = this.route.snapshot.paramMap.get('id');
      this.adminService
        .updateUserAttendanceById(attendanceId, updatedAttendance)
        .subscribe(
          (response) => {
            console.log('Salary updated successfully:', response);
            alert('Salary updated successfully');
          },
          (err) => {
            console.log('Error updating salary:', err);
          }
        );
    }
  }

  private formatDateTimeString(dateString: any, timeString: any): any {
    // Extract date part and concatenate with time part
    return `${dateString.split('T')[0]}T${timeString}`;
  }
}
