import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusReservation',
  standalone: true
})
export class StatusReservationPipe implements PipeTransform {

  transform(value: string): string {
    if(value == "STATUS_APPROVED"){
      return "Disetujui";
    }else if( value == "STATUS_CANCELED"){
      return "Dibatalkan";
    } else if (value ==  "STATUS_REJECTED"){
      return "Ditolak";
    } else if(value == "STATUS_COMPLETED"){
      return "Selesai";
    } else if(value == "STATUS_PENALTY"){
      return "Denda";
    } else if(value == "STATUS_PROCESSED"){
      return "Diproses";
    }

    return "Tidak Diketahui";
  }

}
