import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedFacility: any;

  setSelectedFacility(facility: any) {
    this.selectedFacility = facility;
  }

  getSelectedFacility() {
    return this.selectedFacility;
  }
}
