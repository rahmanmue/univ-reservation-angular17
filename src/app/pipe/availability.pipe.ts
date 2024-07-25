import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availability',
  standalone: true
})
export class AvailabilityPipe implements PipeTransform {

  transform(value: string|undefined): string {
    if(value == 'AVAILABILITY_YES'){
      return 'Tersedia';
    }else if(value == 'AVAILABILITY_NO'){
      return 'Tidak Tersedia';
    }else{
      return 'Tidak Diketahui';
    }
  }

}
