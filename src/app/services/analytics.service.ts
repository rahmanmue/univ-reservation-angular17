import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private BASE_API = environment.apiUrl

  constructor(private http: HttpClient) { }

  getAnalyticsTransaction() {
    return this.http.get(`${this.BASE_API}/analytics/transaction/countByStatus`)
  }

  getAnalyticsFacilities() {
    return this.http.get(`${this.BASE_API}/analytics/facilities/countByType`)
  }
}
