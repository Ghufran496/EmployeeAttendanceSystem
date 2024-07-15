import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private salaryApiUrl = 'https://localhost:7262/api/Salary/';

  constructor(private http: HttpClient) {}

  getUserSalById(_Id: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.salaryApiUrl}${_Id}`;
    return this.http.get(url, { headers });
  }

  
  updateUserSalById(salaryId: any, updatedSalary: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.salaryApiUrl}${salaryId}`;
    return this.http.put(url, updatedSalary, { headers });
  }

  delUserSalById(_Id: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.salaryApiUrl}${_Id}`;
    //console.log(url)
    return this.http.delete(url, { headers });
  }


  private AllUsersalaries = 'https://localhost:7262/api/User/Salary/'
  getSingleUserAllSalById(_Id: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.AllUsersalaries}${_Id}`;
    return this.http.get(url, { headers });
  }


  private AttenapiUrl = 'https://localhost:7262/api/Attendance/';

  getUserAttenById(_Id: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.AttenapiUrl}${_Id}`;
    return this.http.get(url, { headers });
  }

  updateUserAttendanceById(attendanceId: any, updatedAttendance: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.AttenapiUrl}${attendanceId}`;
    return this.http.put(url, updatedAttendance, { headers });
  }

  delUserAttendanceById(_Id: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.AttenapiUrl}${_Id}`;
    //console.log(url)
    return this.http.delete(url, { headers });
  }

  private AllUserAttendences = 'https://localhost:7262/api/User/Attendance/'
  getSingleUserAllAttendById(_Id: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.AllUserAttendences}${_Id}`;
    return this.http.get(url, { headers });
  }

}
