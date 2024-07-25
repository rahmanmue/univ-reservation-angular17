import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-template-admin',
  standalone: true,
  imports: [NgClass, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './template-admin.component.html',
  styleUrl: './template-admin.component.scss'
})
export class TemplateAdminComponent {
  isOpen:boolean = false;

  constructor(private router:Router){}
  toogle(){
    this.isOpen = !this.isOpen;
  }

  logout(){
    Swal.fire({
      title: "Yakin ingin keluar?",
      icon:"question",
      showCancelButton: true,
      confirmButtonColor: "#034C62",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear(); 
        this.router.navigate(['/login']);
      }
  })}
}
