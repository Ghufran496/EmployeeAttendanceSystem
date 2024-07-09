import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'https://localhost:7262/api/Salary/';
  constructor(private http: HttpClient) {

  }

  getUserSalById(_Id: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}${_Id}`;
    return this.http.get(url, { headers });
  }

  private AttenapiUrl = 'https://localhost:7262/api/Attendance/';
  getUserAttenById(_Id: any) {
    const token = sessionStorage.getItem('tokenjwt'); // Retrieve the token from sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.AttenapiUrl}${_Id}`;
    return this.http.get(url, { headers });
  }
}
