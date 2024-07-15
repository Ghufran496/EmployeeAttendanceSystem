import { Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import 'ag-charts-enterprise';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [AgCharts],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent {
  public options: AgChartOptions;

  constructor(
    public authService: AuthService,
    public adminService: AdminService
  ) {
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
  public singleuserAllAttendances: any = [];

  ngOnInit() {
    const userData = this.authService.gettoken();
    //console.log(userData);

    if (userData) {
      this.adminService.getSingleUserAllAttendById(userData.id).subscribe(
        (data) => {
          this.singleuserAllAttendances = data;
          console.log(this.singleuserAllAttendances);
          this.updateChartData();
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }

  updateChartData() {
    const chartData = this.singleuserAllAttendances.map((attendance: any) => {
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

 /* missingYValues = () => {
    const options = { ...this.options, data: [...this.getData()] };
    const data = this.getData();
    data[2].high = undefined;
    data[5].low = undefined;
    options.data = data;
    this.options = options;
  };

  missingXValue = () => {
    const options = { ...this.options, data: [...this.getData()] };
    const data = this.getData();
    data[6].date = undefined;
    options.data = data;
    this.options = options;
  };

  reset = () => {
    const options = { ...this.options, data: [...this.getData()] };
    options.data = this.getData();
    this.options = options;
  };
*/

}

