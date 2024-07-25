import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeFacility',
  standalone: true
})
export class TypeFacilityPipe implements PipeTransform {

  transform(value: string): string {
    if(value == "FACILITIES_VEHICLE"){
      return "Kendaraan";
    }else if(value == "FACILITIES_TOOL"){
      return "Alat";
    }else if(value == "FACILITIES_PLACE"){
      return "Ruangan";
    }else{
      return "Tidak Diketahui";
    }
  }

}
