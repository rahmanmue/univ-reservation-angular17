import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeFacilitiesService {
  private BASE_API = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getTypeFaclities() {
    return this.http.get(`${this.BASE_API}/type-facilities`);
  }
 
}
