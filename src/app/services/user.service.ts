import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get('https://localhost:7262/api/User');
  }

  public AttenapiUrl = 'https://localhost:7262/api/Attendance/';
  CreateEmployeeAttendance(newAttendance: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.AttenapiUrl, newAttendance, {
      headers,
    });
  }


  updateCheckOutTimeEmployee(attendanceId: any, updatedAttendance: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.AttenapiUrl}${attendanceId}`;
    return this.http.put(url, updatedAttendance, { headers });
  }


}
