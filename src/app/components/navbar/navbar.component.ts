import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  


 public data: any;

  constructor(public authService: AuthService) {
    this.data = this.authService.gettoken();
    //console.log(this.data);
    // if (this.data) {
    //   console.log('User ID:', this.data.id);
    // } else {
    //   console.log('No user data found');
    // }
  }
  

}
