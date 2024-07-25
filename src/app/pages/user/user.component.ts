import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TemplateAdminComponent } from '../../shared/template-admin/template-admin.component';
import { RouterLink } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TemplateAdminComponent, RouterLink, CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('editModal') editModal!: ElementRef;

  userData: any;
  selectedData:any;
  selectedUserId: any;

  constructor(private userService: UserProfileService) {
  }
  
  ngOnInit(): void {
    this.getDataProfile();
  }

  getDataProfile() {
    this.userService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        // console.log(data)
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  userDetail: any;
  onDetail(user: any){
    this.userDetail = user;
    
  }

  onDelete(id: string){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserData(id).subscribe({
          next: (data) => {
          // console.log(("Delete Success "), data)
          this.getDataProfile();
          },  
          error: (err) => console.error(("Delete Failed"), err)
        });
      }
    });
  }

  addUserForm = new FormGroup({
    nim: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    fullName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(12), Validators.pattern('[- +()0-9]+')]),
    birthDate: new FormControl('', Validators.required),
    photo: new FormControl('user-avatar.jpg', Validators.required)
  })

  get addPassword(){
    return this.addUserForm.get('password');
  }

  get addEmail(){
    return this.addUserForm.get('email');
  }

  get addPhone(){
    return this.addUserForm.get('phone');
  }

  addUser(){
    if(this.addUserForm.valid){
      this.userService.postUserData(this.addUserForm).subscribe({
        next: (data: any) => {
          // console.log('Add Success', data);
          this.getDataProfile();
          this.closeModal(this.addModal);
          this.addUserForm.reset();
        },
        error: (err: any) => {
          console.error('Add Failed', err);
          console.error('Error details:', err.status, err.statusText, err.message);
        }
      });
    } else {
      this.alert("error", "Form Tidak Valid")
    }
  }

  editUserForm = new FormGroup({
    nim: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    fullName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(12), Validators.pattern('[- +()0-9]+')]),
    birthDate: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required)
  })

  get editPassword(){
    return this.editUserForm.get('password');
  }

  get editEmail(){
    return this.editUserForm.get('email');
  }

  get editPhone(){
    return this.editUserForm.get('phone');
  }


  onEdit(id: string) {
    this.selectedUserId = id;
    const user = this.userData.data.find((u: any) => u.id === id);
    console.log(user.photo)
    this.editUserForm.patchValue({
      nim: user.nim,
      email: user.user.email,
      password: '',
      fullName: user.fullName,
      phone: user.phone,
      birthDate: user.dateofbirth ,
      photo: user.photo
    });
  }

  saveEdit(){
    if(this.editUserForm.valid || this.editUserForm.get('password')?.value == ''){
      this.userService.editUserData(this.editUserForm, this.selectedUserId).subscribe({
        next: (data) => {
          console.log('Edit Success', data);
          this.getDataProfile();
          this.closeModal(this.editModal);
        },
        error: (err) => {
          console.error('Edit Failed', err);
        }
      });
    }else{
      this.alert("error", "Form Tidak Valid");
    }
  }

  closeModal(modalElement: ElementRef): void {
    const modal = this.addModal.nativeElement as HTMLElement;
    modal.classList.remove('show'); 
    modal.style.display = 'none'; 
    document.body.classList.remove('modal-open'); 
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if(modalBackdrop){
      modalBackdrop.remove(); 
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



}
