import { Component } from '@angular/core';
import { TemplateUserComponent } from '../../shared/template-user/template-user.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TemplateUserComponent, ReactiveFormsModule, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  userProfile!: any;
  photoProfile: string = "http://localhost:4200/api/profile/avatar/";
  profileId!: string;
  userId: string = localStorage.getItem('userId') as string;
  toggle:boolean = true;
  isInvalid: boolean = false;
  msgErr!:string;
  isUploaded: boolean = false;

  passwordForm:FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
  })

  

  constructor(private fb: FormBuilder, private profileService: ProfileService){
    this.profileForm = this.fb.group({
      file: ['', Validators.required],
      nim: ['', Validators.required],
      fullName: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(12), Validators.pattern('[- +()0-9]+')]]
    })
  }

  
  ngOnInit(){
    this.getProfileByUserId();
  }

  get password(){
    return this.passwordForm.get('password');
  }

  get phone(){
    return this.profileForm.get('phone');
  }

  updatePassword(id:string, password: string){
      const data = {
        password: password
      }

      this.profileService.updatePassword(id, data).subscribe({
        next: (data)=> {
          // console.log(data)
          this.alert("success")
        }, 
        error : (err) => {
          console.log(err)
          this.alert("error", err.statusText)
        }
      })
  }

  onSubmitPassword(){
    if(this.passwordForm.valid){
      this.updatePassword(this.userId, this.passwordForm.value.password);
      return;
    }
    this.alert("error", "Password Tidak Valid")
    return
   
  }


  getProfileByUserId(){
    this.profileService.getProfileByUserId(this.userId).subscribe({
      next: (data)=> {
        this.userProfile = data;
        this.profileId = this.userProfile.data.id;
        this.photoProfile += this.userProfile.data.photo;
        const date = new Date(this.userProfile.data.dateofbirth);
        const formattedDate = date.toISOString().split('T')[0];
        this.profileForm.patchValue({
          file: this.userProfile.data.photo,
          nim: this.userProfile.data.nim,
          fullName: this.userProfile.data.fullName,
          dateofbirth: formattedDate,
          phone: this.userProfile.data.phone
        });
      }
    })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.patchValue({
        file: file
      });
      this.previewFile(file);
      this.isUploaded = true;
    }
  }

  previewFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
  }

  onSubmit(){
    
    if(this.isUploaded && this.profileForm.valid){;
      const formData = new FormData();
      formData.append('photo', this.profileForm.value.file);
      formData.append('id_profile', this.profileId);
      formData.append('nim', this.profileForm.value.nim.toString());
      formData.append('fullName', this.profileForm.value.fullName);
      formData.append('dateofbirth', this.profileForm.value.dateofbirth);
      formData.append('phone', this.profileForm.value.phone);
      
  
      this.profileService.updateProfile(formData).subscribe({
        next: (data)=> {
          // console.log(data)
          this.alert("success")
          this.isUploaded = false;
          this.profileForm.value.file = null;
        }, 
        error : (err) => {
          console.log(err)
          this.alert("error", err.statusText)
        }
      })
    }else if(this.profileForm.valid && !this.isUploaded){
      // console.log(this.isUploaded);
      // console.log(this.userProfile.data.photo);
      // console.log(this.profileForm.value);

      const body = {
        id: this.profileId,
        nim: this.profileForm.value.nim,
        fullName: this.profileForm.value.fullName,
        dateofbirth: this.profileForm.value.dateofbirth,
        phone: this.profileForm.value.phone,
        photo: this.userProfile.data.photo,
        user: {
          id: this.userId,
        }
      }

      this.profileService.updateProfileWithoutPhoto(body).subscribe({
        next: ()=> {
          this.alert("success", "Berhail Memperbarui Data")
        }, 
        error: err => {
          this.alert("error", err.statusText)
        }
      })
    }else{
      this.alert("error", "Data Tidak Valid")
      return
    }
  }

  alert(status:string, msg: string = ''){
    if (status == "success"){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: 1500
      });
    }else if(status == "error"){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1500
      });
    }
   
  }

  ontogglePassword(){
    this.toggle = !this.toggle;
  }



}
