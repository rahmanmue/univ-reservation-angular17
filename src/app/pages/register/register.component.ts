import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { User } from '../../interface/user';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isInvalid: boolean = false;
  msgErr!: string; 
  toggle:boolean = true;

 

  constructor(private authService: AuthService, private route: Router){

  }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  get password() {
    return this.registerForm.get('password');
  }

  get email(){
    return this.registerForm.get('email')
  }


  register(){
    // console.log(this.registerForm.value)
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value as User)
        .subscribe({
          next : data => {
            this.route.navigate(['/login'])
            return
          },
          error : err =>{
            this.isInvalid = true;
            if(err.status == 400){
              this.msgErr = err.statusText
            }else if(err.status == 403){
              this.msgErr = "Akun Sudah Terdaftar"
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

  
}
