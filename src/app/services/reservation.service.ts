import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Reservation } from '../interface/reservation';

interface Status {
  status:string
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private BASE_API = environment.apiUrl


  constructor(private http:HttpClient) { }

  getAllReservations(page:number = 0, size:number=5): Observable<Reservation>{
    return this.http.get<Reservation>(`${this.BASE_API}/transaction/all?page=${page}&size=${size}`)
  }

  updateStatusTransaction(id_transaction:string, status: Status){
    return this.http.put(`${this.BASE_API}/transaction/status-reserv/${id_transaction}`, status)
  }

  getReservationBySubject(subject:string): Observable<Reservation>{
    return this.http.get<Reservation>(`${this.BASE_API}/transaction/${subject}`)
  }
} 
