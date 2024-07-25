import { Component } from '@angular/core';
import { TemplateAdminComponent } from '../../shared/template-admin/template-admin.component';
import { Router, RouterLink } from '@angular/router';
import { FacilitiesService } from '../../services/facilities.service';
import Swal from 'sweetalert2';
import { AvailabilityPipe } from '../../pipe/availability.pipe';
import { TypeFacilityPipe } from '../../pipe/type-facility.pipe';
import { StorageFirebaseService } from '../../services/storage-firebase.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';


@Component({
  selector: 'app-fasility',
  standalone: true,
  imports: [
    TemplateAdminComponent, 
    RouterLink, 
    AvailabilityPipe, 
    TypeFacilityPipe, 
    PaginationComponent
  ],
  templateUrl: './fasility.component.html',
  styleUrl: './fasility.component.scss'
})
export class FasilityComponent {
  facilities!:any;
  totalElements = 0;
  page = 0;
  size = 5; 
  response: any;
  name!: string;


  constructor(
    private facilityService: FacilitiesService, 
    private storage: StorageFirebaseService
    ){}

  ngOnInit(): void {
    this.getAllFacility()
  }

  onPageChange(page: number) {
    this.page = page;
    this.getAllFacility()
  }

  getAllFacility(){
    this.facilityService.getAllFacilities(this.page,this.size).subscribe({
      next : (data) => {
        console.log(data)
        this.response = data;
        this.facilities = this.response.data;
        this.totalElements = this.response.data.totalElements;
      }, error : (err) => console.log(err)
    })
  }

  onClickDelete(id: string, picture: string){
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Menghapus secara permanen data fasilitas ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus saja!",
      cancelButtonText: "Tidak"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFacility(id)
        this.storage.deleteFile(picture).subscribe(
          (data) => console.log(data),
          (err) => console.log(err)
        )
        Swal.fire({
          title: "Dihapus!",
          text: "Data fasilitas ini telah dihapus.",
          icon: "success"
        });
      }
    });
  }

 deleteFacility(id: string){
   this.facilityService.deleteFacility(id).subscribe({
    next : () => {
      this.getAllFacility();
    }, error : (err) => console.log(err)
   })
 }

 onChangeSearch(e:any){
  this.name = e.target.value;
 }

 refresh(){
  this.getAllFacility();
 }

 onClickSearch(){
  console.log(this.name);
  this.facilityService.getFacilityByName(this.name).subscribe({
    next : (data) => {
      console.log(data)
      this.response = data;
      this.facilities = this.response.data;
      this.totalElements = this.response.data.totalElements;
    }, error : (err) => console.log(err)
  })
 }

}
