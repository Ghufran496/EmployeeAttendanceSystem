import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import 'ag-charts-enterprise';


@Component({
  selector: 'app-single-user-salaries',
  standalone: true,
  imports: [CommonModule,AgCharts],
  templateUrl: './single-user-salaries.component.html',
  styleUrl: './single-user-salaries.component.css'
})
export class SingleUserSalariesComponent {
  public options: AgChartOptions;

 public singleuserAllSalaries: any = [];
 public singleuserAllAttendances: any = [];
 public singleuserAllLeaves: any = [];

  constructor(private adminService: AdminService,private route: ActivatedRoute) {
    this.options = {
      data: this.getData(),
      title: {
        text: 'Employee Attendances',
      },
      series: [
        {
          type: 'range-bar',
          xKey: 'date',
          xName: 'Date',
          yLowKey: 'low',
          yHighKey: 'high',
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
        },
        {
          type: 'time',
          position: 'bottom',
          nice: false,
          crosshair: {
            enabled: false,
          },
        },
      ],
    };
  }


  getData(): any[] {
    return [
      { date: new Date(2022, 10, 1), high: 800, low: 1700 },
      { date: new Date(2022, 10, 2), high: 900, low: 1800 },
      { date: new Date(2022, 10, 3), high: 830, low: 1600 },
      { date: new Date(2022, 10, 4), high: 800, low: 1630 },
      { date: new Date(2022, 10, 5), high: 600, low: 1700 },
      { date: new Date(2022, 10, 6), high: 800, low: 1700 },
      { date: new Date(2022, 10, 7), high: 800, low: 1700 },
      { date: new Date(2022, 10, 8), high: 600, low: 1500 },
      { date: new Date(2022, 10, 9), high: 700, low: 1600 },
      { date: new Date(2022, 10, 10), high: 600, low: 1500 },
      { date: new Date(2022, 10, 11), high: 700, low: 1900 },
      { date: new Date(2022, 10, 12), high: 800, low: 1700 },
      { date: new Date(2022, 10, 13), high: 800, low: 1700 },
      { date: new Date(2022, 10, 14), high: 900, low: 1800 },
      { date: new Date(2022, 10, 15), high: 830, low: 1600 },
      { date: new Date(2022, 10, 16), high: 800, low: 1630 },
      { date: new Date(2022, 10, 17), high: 600, low: 1700 },
      { date: new Date(2022, 10, 18), high: 800, low: 1700 },
      { date: new Date(2022, 10, 19), high: 800, low: 1700 },
      { date: new Date(2022, 10, 20), high: 600, low: 1500 },
      { date: new Date(2022, 10, 21), high: 700, low: 1600 },
      { date: new Date(2022, 10, 22), high: 600, low: 1500 },
      { date: new Date(2022, 10, 23), high: 700, low: 1900 },
      { date: new Date(2022, 10, 24), high: 800, low: 1700 },
      { date: new Date(2022, 10, 25), high: 800, low: 1700 },
      { date: new Date(2022, 10, 26), high: 900, low: 1800 },
      { date: new Date(2022, 10, 27), high: 830, low: 1600 },
      { date: new Date(2022, 10, 28), high: 800, low: 1630 },
      { date: new Date(2022, 10, 29), high: 600, low: 1700 },
      { date: new Date(2022, 10, 30), high: 800, low: 1700 },
      { date: new Date(2022, 11, 1), high: 800, low: 1700 },
      { date: new Date(2022, 11, 2), high: 600, low: 1500 },
      { date: new Date(2022, 11, 3), high: 700, low: 1600 },
      { date: new Date(2022, 11, 4), high: 600, low: 1500 },
      { date: new Date(2022, 11, 5), high: 700, low: 1900 },
      { date: new Date(2022, 11, 6), high: 800, low: 1700 },
    ];
  }

  ngOnInit() {
    const UserId = this.route.snapshot.paramMap.get('id');
    this.getAllUsersSalaries(UserId);
    this.getAllUsersAttendances(UserId);
    this.getAllUsersLeaves(UserId);
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
        //console.log(this.singleuserAllSalaries);
        
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
        this.updateChartData();
      },
      (err) => {
        console.log('Error fetching users:', err);
      }
    );
  }

  getAllUsersLeaves(UserId: any) {
    this.adminService.getSingleUserAllLeavesById(UserId).subscribe(
      (data: any) => {
        this.singleuserAllLeaves = data;
        console.log(this.singleuserAllLeaves);
        
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

  updateChartData() {
    const chartData = this.singleuserAllAttendances.map((attendance: any) => {
      //console.log(attendance)
      // Format checkInTime and checkOutTime as required
      const attendanceDate = new Date(attendance.attendanceDate);
      const checkInTime = this.formatTime(attendance.checkInTime);
      const checkOutTime = this.formatTime(attendance.checkOutTime);
      return {
        date: attendanceDate,
        low: checkInTime,
        high: checkOutTime,
      };
    });

    const options = { ...this.options, data: chartData };
    this.options = options;
  }

  formatTime(dateTimeString: string): number {
    // Create a new Date object from the datetime string
    const dateTime = new Date(dateTimeString);

    // Extract the time components
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    // Format the time as HHmm (e.g., 8:00 -> 800, 9:00 -> 900)
    const formattedTime = hours * 100 + minutes;

    return formattedTime;
  }

}
