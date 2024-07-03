import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {

 

  email =new FormControl("",[
    Validators.required,
    Validators.email
    
  ])


  password = new FormControl("",[
    Validators.required,
    Validators.minLength(6)
  ])

  loginForm = new FormGroup({
  
    email:this.email,
    password:this.password

  })

  login(){
    //this.authService.loginUser(this.loginForm.value.email!,this.loginForm.value.password!)
  }
  reset(){
    this.loginForm.reset()
  }

}

