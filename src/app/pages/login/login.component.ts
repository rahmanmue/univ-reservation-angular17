import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from '../../interface/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isInvalid: boolean = false;
  msgErr!: string; 
  toggle:boolean = true;
  token!:string;

  constructor(private authService: AuthService, private route: Router){

  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  get password() {
    return this.loginForm.get('password');
  }

  get email(){
    return this.loginForm.get('email');
  }


  login() {
    if(this.loginForm.valid){
     this.authService.login(this.loginForm.value as User)
      .subscribe({
        next : data => {
          if(data.data == null){
            this.isInvalid = true;
            this.msgErr = "Password / Email salah"
            return
          }
          this.setUserInfo(data.data);
          return
        },
        error : err => {
          //error 400
          this.isInvalid = true;
          if(err.status == 400){
            this.msgErr = err.statusText
          }else if(err.status == 403){
            this.msgErr = "Password / Email salah"
          }else if(err.status == 404){
            this.msgErr = err.statusText
          }else{
            this.msgErr = err.statusText
          }  
         
        }
      })
    }else{
      this.isInvalid = true;
      this.msgErr = "Beberapa data tidak valid. lengkapi data dengan benar.!"
      return
    }
  }

  closeAlert(){
    this.isInvalid = false;
  }

  ontogglePassword(){
    this.toggle = !this.toggle;
  }

  setUserInfo(data : any){
    const decode = jwtDecode(data.token);
    let userId = decode.sub ? decode.sub : '';
    localStorage.setItem("token", data.token as string)
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId",userId);
    localStorage.setItem("role", data.role);
    if(data.role == "ROLE_GENERAL"){
      this.route.navigate(['/home'])
    }else if(data.role == "ROLE_ADMIN"){
      this.route.navigate(['/dashboard'])
    }
  }

}
