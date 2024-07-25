  import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FacilitiesService } from '../../services/facilities.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<any>();

  facilityName: string = '';
  facilityType: string = '';
  startDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  endDate: string = formatDate(new Date(new Date().setDate(new Date().getDate() + 7)), 'yyyy-MM-dd', 'en');

  constructor(private facilityService: FacilitiesService) { }

  onSearchClick() {
    if (this.facilityName) {
      this.facilityService.getFacilitiesByName(this.facilityName, this.startDate, this.endDate).subscribe({
        next: (data) => {
          this.filterChanged.emit(data);
        },
        error: (err) => console.log(err)
      });
    } else if (this.facilityType) {
      this.facilityService.getFacilitiesByType(this.facilityType, this.startDate, this.endDate).subscribe({
        next: (data) => {
          this.filterChanged.emit(data);
        },
        error: (err) => console.log(err)
      });
    }
  }
}
