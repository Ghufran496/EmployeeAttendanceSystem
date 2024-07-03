import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-component.component.html',
  styleUrl: './signup-component.component.css'
})
export class SignupComponentComponent {

  name =new FormControl("",[
    Validators.required,
    Validators.minLength(20)
  ])

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
    password:this.password,
    name: this.name
  })

  signup(){
    //this.authService.loginUser(this.loginForm.value.email!,this.loginForm.value.password!)
  }
  reset(){
    this.loginForm.reset()
  }


}
