import { Component } from '@angular/core';
import { TemplateAdminComponent } from '../../shared/template-admin/template-admin.component';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../interface/reservation';
import { DatePipe } from '@angular/common';
import { StatusReservationPipe } from '../../pipe/status-reservation.pipe';
import { FacilitiesService } from '../../services/facilities.service';
import { Facility, FacilityResponse } from '../../interface/facility';
import { StatusReservationService } from '../../services/status-reservation.service';
import { StatusReservation } from '../../interface/status-reservation';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { AvailabilityPipe } from '../../pipe/availability.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peminjaman-aset',
  standalone: true,
  imports: [
    TemplateAdminComponent,
    DatePipe,
    StatusReservationPipe, 
    PaginationComponent,
    AvailabilityPipe
  ],
  templateUrl: './peminjaman-aset.component.html',
  styleUrl: './peminjaman-aset.component.scss'
})
export class PeminjamanAsetComponent {
  data = 1;
  reservation : Reservation [] = [];
  response : any;
  detailItem! : Reservation;
  responseFacility : any;
  facility!: FacilityResponse;
  status!:string;
  statusReservation! : StatusReservation[];
  totalElements = 0;
  page = 0;
  size = 5;
  subject!:string;
  

  constructor(
    private reservationService: ReservationService,
    private facilityService: FacilitiesService,
    private statusReservationService: StatusReservationService
    ) {}

  ngOnInit(): void {
    this.getAllReservation();
    this.getAllStatusReservation();
  }

  onPageChange(page: number) {
    this.page = page;
    this.getAllReservation()
  }

  getAllReservation(){
    this.reservationService.getAllReservations(this.page, this.size).subscribe({
      next: (data) => {
        this.response = data;
        this.reservation = this.response.data.data;
        this.totalElements = this.response.data.totalElements;
        // console.log(this.reservation)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getAllStatusReservation(){
    this.statusReservationService.getAllStatus().subscribe({
      next: (data) => {
        this.statusReservation = data as any
        // console.log(this.statusReservation)
      }
    })
  }

  getFacilityById(id: string){
    this.facilityService.getFacilityById(id).subscribe({
      next: (data) => {
        this.responseFacility = data
        this.facility = this.responseFacility.data;
        // console.log(this.facility)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  onChangeSelect(event: any){
    console.log(event.target.value)
    this.status = event.target.value;
  }

  onClickUpdateStatus(){
    // console.log(this.detailItem.id)
    // console.log(this.status)
    this.reservationService.updateStatusTransaction(this.detailItem.id, {status: this.status}).subscribe({
      next: () => {
        // console.log(data) 
        this.getAllReservation();
        this.alert("success", "Status Berhasil Diupdate")
      },
      error: (err:any) => {
        console.log(err)
        this.alert("error", err.statusText)
      }
    })
  }

  onClickDetail(item: Reservation){
    this.detailItem = item as Reservation;
    // console.log(item.transactionDetailDTO[0].id)
    this.getFacilityById(item.transactionDetailDTO[0].idFac)
    // console.log(this.facility)
  }

  onChangeSearch(e:any){
    this.subject = e.target.value;
  }

  refresh(){
    this.getAllReservation();
  }

  onClickSearch(){
    console.log(this.subject);
    this.reservationService.getReservationBySubject(this.subject).subscribe({
      next: (data) => {
        // console.log(data)
        this.response = data;
        this.reservation = this.response.data.data;
        this.totalElements = this.response.data.totalElements;
      },
      error: (err) => {
        console.log(err)
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
