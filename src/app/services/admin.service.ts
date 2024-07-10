import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'https://localhost:7262/api/Salary/';
  constructor(private http: HttpClient) {}

  getUserSalById(_Id: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}${_Id}`;
    return this.http.get(url, { headers });
  }

  private updateSalaryapiUrl = 'https://localhost:7262/api/Salary/';
  updateUserSalById(salaryId: any, updatedSalary: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.updateSalaryapiUrl}${salaryId}`;
    return this.http.put(url, updatedSalary, { headers });
  }

  private AttenapiUrl = 'https://localhost:7262/api/Attendance/';
  getUserAttenById(_Id: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.AttenapiUrl}${_Id}`;
    return this.http.get(url, { headers });
  }

  private updateAttendanceapiUrl = 'https://localhost:7262/api/Attendance/';
  updateUserAttendanceById(attendanceId: any, updatedAttendance: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.updateAttendanceapiUrl}${attendanceId}`;
    return this.http.put(url, updatedAttendance, { headers });
  }
}
