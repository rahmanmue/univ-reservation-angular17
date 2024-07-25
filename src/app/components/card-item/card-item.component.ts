import { Component, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { Router, RouterLink } from '@angular/router';
import { FacilitiesService } from '../../services/facilities.service';
import { SharedService } from '../../services/shared.service';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';
import { TypeFacilityPipe } from '../../pipe/type-facility.pipe';
import Swal from 'sweetalert2';
import { ProfileService } from '../../services/profile.service';
import { AvailabilityPipe } from '../../pipe/availability.pipe';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    RouterLink,
    TypeFacilityPipe,
    AvailabilityPipe, 
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {
  // facilities!:any;
  // totalElements = 0;
  // page = 0;
  // size = 5; 
  // response: any;

  // constructor(
  //   private facilityService: FacilitiesService,
  //   private sharedService: SharedService,
  //   ){}

  // ngOnInit(): void {
  //   this.getAllFacility()
  // }

  // onPageChange(page: number) {
  //   this.page = page;
  //   console.log(`Page changed to: ${page}`);
  //   this.getAllFacility()
  // }

  // getAllFacility(){
  //   this.facilityService.getAllFacilities(this.page,this.size).subscribe({
  //     next : (data) => {
  //       console.log(data)
  //       this.response = data;
  //       this.facilities = this.response.data;
  //       this.totalElements = this.response.data.totalElements;
  //     }, error : (err) => console.log(err)
  //   })
  // }

  // filterByName(): void {
  //   this.facilityService.getFacilitiesByName(this.filterName, this.startDate, this.endDate, this.currentPage, this.pageSize).subscribe({
  //     next: (response) => {
  //       this.facilitiesData = response.data.data || [];
  //       this.totalPages = response.data.totalPages || 0;
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }
  
  // selectFacility(facility: any): void {
  //   this.sharedService.setSelectedFacility(facility);
  // }

  facilities!: any;
  totalElements = 0;
  page = 0;
  size = 3; 
  response: any;
  userProfile!: any;
  userId: string = localStorage.getItem('userId') as string;

  constructor(
    private facilityService: FacilitiesService,
    private sharedService: SharedService,
    private profileService: ProfileService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllFacility();
    this.loadUserProfile();
  }

  onPageChange(page: number) {
    this.page = page;
    console.log(`Page changed to: ${page}`);
    this.getAllFacility();
  }

  getAllFacility() {
    this.facilityService.getAllFacilities(this.page, this.size).subscribe({
      next: (data) => {
        console.log(data);
        this.response = data;
        this.facilities = this.response.data;
        this.totalElements = this.response.data.totalElements;
      },
      error: (err) => console.log(err)
    });
  }

  loadUserProfile() {
    this.profileService.getProfileByUserId(this.userId).subscribe({
      next: (data) => {
        this.userProfile = data;
      },
      error: (err) => {
        console.error('Error fetching profile data:', err);
      }
    });
  }

  checkUserProfile() {
    if (!this.userProfile.data.fullName || !this.userProfile.data.phone) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Profile',
        text: 'Silahkan lakukan update profile terlebih dahulu pada menu profile.',
        confirmButtonColor: '#034C62'
      });
      return false;
    }
    return true;  
  }

  onCardButtonClick(facility: any) {
    if (this.checkUserProfile()) {
      this.sharedService.setSelectedFacility(facility);
      this.router.navigate(['/submission']);
    }
  }
  
  // filterByType(): void {
  //   this.facilityService.getFacilitiesByType(this.filterType, this.startDate, this.endDate, this.currentPage, this.pageSize).subscribe({
  //     next: (response) => {
  //       this.facilitiesData = response.data.data || [];
  //       this.totalPages = response.data.totalPages || 0;
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

  
}
