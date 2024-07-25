import { ChangeDetectorRef, Component } from '@angular/core';
import { TemplateAdminComponent } from '../../shared/template-admin/template-admin.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StorageFirebaseService } from '../../services/storage-firebase.service';
import { error } from 'console';
import { Facility } from '../../interface/facility';
import { FacilitiesService } from '../../services/facilities.service';
import { UPLOAD_PATH } from '../../shared/constant/PATH_UPLOAD';
import { NgClass, NgIf } from '@angular/common';
import { AvailabilityService } from '../../services/availability.service';
import { TypeFacilityPipe } from '../../pipe/type-facility.pipe';
import { AvailabilityPipe } from '../../pipe/availability.pipe';
import { TypeFacilitiesService } from '../../services/type-facilities.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-fasility-add',
  standalone: true,
  imports: [
    TemplateAdminComponent, 
    ReactiveFormsModule, 
    NgClass,
    NgIf, 
    TypeFacilityPipe, 
    AvailabilityPipe
  ],
  templateUrl: './fasility-add.component.html',
  styleUrl: './fasility-add.component.scss'
})
export class FasilityAddComponent {
  File!:any;
  invalidImg:boolean = false;
  availability : any;
  typeFacilities: any;
  isLoading:boolean = false;

  constructor(
    private storage: StorageFirebaseService, 
    private fasilityService: FacilitiesService,
    private availabilityService : AvailabilityService,
    private typeFacilitiesService : TypeFacilitiesService,
    private cd : ChangeDetectorRef
    ){ 

      this.availabilityService.getAvailabilities().subscribe({
        next: (data) => {
          this.availability = data
          console.log("avail",data)
        },
        error: (err) => {
          console.log(err)
        }
      })


      this.typeFacilitiesService.getTypeFaclities().subscribe({
        next: (data) => {
          console.log("facility",data)
          this.typeFacilities = data
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  onChangeFile(event: any){
    const file = event.target.files[0];
    if(file.size > 5  * 1024 * 1024){
      this.invalidImg = true;
    }else{
      this.invalidImg = false;
      this.File = file;
    }
  }


  fasilityForm = new FormGroup({
    name: new FormControl('', Validators.required),
    information : new FormControl('', Validators.required),
    picture : new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    typeFacilities: new FormControl('', Validators.required),
    availability: new FormControl('', Validators.required)
  })

 

  onSubmit(){
    if(this.fasilityForm.valid){
      this.isLoading = true;
      const path = `${UPLOAD_PATH.image}/${this.File.name}`
      this.storage.uploadFile(path, this.File).pipe(
        finalize(()=>{
          this.isLoading = false;
          this.cd.detectChanges();
          console.log(this.isLoading)
        })
      ).subscribe({
        next: (url)=> {
         this.isLoading = true;
          const facility : Facility = {
            name: this.fasilityForm.value.name as string,
            information: this.fasilityForm.value.information as string,
            picture: url,
            quantity: Number(this.fasilityForm.value.quantity),
            typeFacilities: this.fasilityForm.value.typeFacilities as string,
            availability: this.fasilityForm.value.availability as string
          }

          console.log(facility)
          this.addFacility(facility, path);
  
        }, 
        error: (err) => {
          this.isLoading = false;
          this.alert("error", err.status)
        }
      })

    }else{
      this.alert("error", "Form Tidak Valid, Isi Data dengan Benar")
      return
    }
    
   
    console.log(this.fasilityForm.value)
  }

  addFacility(body:Facility, path=''){
    this.fasilityService.addFacility(body).subscribe({
      next: (data) => {
        console.log(data)
        this.alert("success", "Data Berhasil Dimasukan")
        this.fasilityForm.reset();
        return
      },
      error: (err) => {
        if(path != ''){
          this.storage.deleteFile(path);
        }
        this.alert("error", err.status)
      }
    })
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
