import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageFirebaseService } from '../../services/storage-firebase.service';
import { FacilitiesService } from '../../services/facilities.service';
import { Facility } from '../../interface/facility';
import Swal from 'sweetalert2';
import { TemplateAdminComponent } from '../../shared/template-admin/template-admin.component';
import { ActivatedRoute } from '@angular/router';
import { UPLOAD_PATH } from '../../shared/constant/PATH_UPLOAD';
import { NgClass, NgFor } from '@angular/common';
import { AvailabilityService } from '../../services/availability.service';
import { TypeFacilitiesService } from '../../services/type-facilities.service';
import { AvailabilityPipe } from '../../pipe/availability.pipe';
import { TypeFacilityPipe } from '../../pipe/type-facility.pipe';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-fasility-edit',
  standalone: true,
  imports: [TemplateAdminComponent, ReactiveFormsModule, NgClass, NgFor, AvailabilityPipe, TypeFacilityPipe],
  templateUrl: './fasility-edit.component.html',
  styleUrl: './fasility-edit.component.scss'
})
export class FasilityEditComponent {
  picture!:string;
  File!:any;
  previewUrl!:any;
  facility:any;
  fasilityForm!: FormGroup;
  invalidImg:boolean = false;
  availability: any;
  typeFacilities: any;
  isLoading: boolean = false;

  constructor(
    private storage: StorageFirebaseService,
    private fasilityService: FacilitiesService,
    private route: ActivatedRoute,
    private availabilityService : AvailabilityService,
    private typeFacilitiesService : TypeFacilitiesService,
    private cd : ChangeDetectorRef){ 
      this.fasilityForm = new FormGroup({
        name: new FormControl('', Validators.required),
        information : new FormControl('', Validators.required),
        picture : new FormControl(''),
        quantity: new FormControl('', Validators.required),
        typeFacilities: new FormControl('', Validators.required),
        availability: new FormControl('', Validators.required)
      })

      this.availabilityService.getAvailabilities().subscribe({
        next: (data) => {
          this.availability = data
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

  ngOnInit(){
    this.getFacilityById(this.route.snapshot.params['id'])
  }

  ngOnChanges(){
    console.log(this.facility)
    if(this.facility){
      this.changeForm()
    }
    
  }
  
  getFacilityById(id: string){
    this.fasilityService.getFacilityById(id).subscribe({
      next : (data) => {
        this.facility = data;
        this.facility = this.facility;
        console.log(this.facility)
        this.picture = this.facility.data.picture;
        console.log(this.picture)
        this.changeForm()
    
      }, error : (err) => console.log(err)
    })
  }

  changeForm(){
    this.fasilityForm.patchValue({
      name: this.facility.data.name,
      information : this.facility.data.information,
      picture : '',
      quantity: this.facility.data.quantity,
      typeFacilities: this.facility.data.typeFacilities.id,
      availability: this.facility.data.availability.id
    })
  }

  onChangeFile(event: any){
    const file = event.target.files[0];
    if(file.size > 5  * 1024 * 1024){
      this.invalidImg = true;
    }else{
      this.invalidImg = false;
      this.File = file;
      const reader = new FileReader();
      reader.readAsDataURL(this.File);
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
    }    
  }

  

 

  onSubmit(){
    if(this.fasilityForm.valid){
      if(this.File){
        const path = `${UPLOAD_PATH.image}/${this.File.name}`
        this.storage.uploadFile(path, this.File).pipe(
          finalize(()=>{
            this.isLoading = false;
            this.cd.detectChanges();
            console.log(this.isLoading)
          })
        ).subscribe({
          next: (url)=> {
            const facility : Facility = {
              id: this.facility.data.id,
              name: this.fasilityForm.value.name as string,
              information: this.fasilityForm.value.information as string,
              picture: url,
              quantity: Number(this.fasilityForm.value.quantity),
              typeFacilities: this.facility.data.typeFacilities.id as string,
              availability: this.facility.data.availability.id as string
            }
            console.log(facility)          
            this.updateFacility(facility, path)
            return
          }, 
          error: (err) => this.alert("error", err.status)
        })
      }else{
        const facility : Facility = {
          id: this.facility.data.id,
          name: this.fasilityForm.value.name as string,
          information: this.fasilityForm.value.information as string,
          picture: this.picture,
          quantity: Number(this.fasilityForm.value.quantity),
          typeFacilities: this.facility.data.typeFacilities.id as string,
          availability: this.facility.data.availability.id as string
        }
        console.log(facility)
        this.updateFacility(facility)
        return
      }      
    }else{
      this.alert("error", "Form Tidak Valid, Isi Data dengan Benar")
      return
    }

    console.log(this.fasilityForm.value)
  }

  updateFacility(body:any, path: string = ''){
    this.fasilityService.updateFacility(body).subscribe({
      next: (data) => {
        console.log(data)
        this.alert("success", "Data Berhasil Diupdate")
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
