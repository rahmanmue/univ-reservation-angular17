import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusReservationService {

  private BASE_API = environment.apiUrl

  constructor(private http:HttpClient) { }

  getAllStatus(){
    return this.http.get(`${this.BASE_API}/status-reserv`)
  }

  
}
