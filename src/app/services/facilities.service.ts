import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facility } from '../interface/facility';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  private BASE_API = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getAllFacilities(page:number = 0, size:number=5){
    return this.http.get(`${this.BASE_API}/facilities/all?page=${page}&size=${size}`)
  }

  getFacilityById(id:string){
    return this.http.get(`${this.BASE_API}/facilities/detail/${id}`)
  }

  getFacilityByName(name:string){
    return this.http.get(`${this.BASE_API}/facilities/name/${name}`)
  }

  addFacility(body:Facility){
    return this.http.post(`${this.BASE_API}/facilities/add`, body)
  }

  updateFacility(body:Facility){
    return this.http.put(`${this.BASE_API}/facilities/update`, body)
  }

  deleteFacility(id:string){
    return this.http.delete(`${this.BASE_API}/facilities/${id}`)
  }

  // getFacilitiesByName(name: string, startDate: string, endDate: string, page: number, size: number): Observable<any> {
  //   let params = new HttpParams()
  //     .append('startDate', startDate)
  //     .append('endDate', endDate)
  //     .append('page', page.toString())
  //     .append('size', size.toString());
  //   return this.http.get(`${this.BASE_API}/fasilities/name/${name}`, { params });
  // }

  // getFacilitiesByType(typeId: string, startDate: string, endDate: string, page: number, size: number): Observable<any> {
  //   let params = new HttpParams()
  //     .append('startDate', startDate)
  //     .append('endDate', endDate)
  //     .append('page', page.toString())
  //     .append('size', size.toString());
  //   return this.http.get(`${this.BASE_API}/fasilities/type/${typeId}`, { params });
  // }

  getFacilitiesByName(name: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.BASE_API}/fasilities/name/${name}`, {
      params: { startDate, endDate }
    });
  }

  getFacilitiesByType(typeId: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.BASE_API}/fasilities/type/${typeId}`, {
      params: { startDate, endDate }
    });
  }

}
