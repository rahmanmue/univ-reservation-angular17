import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrlHistory = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHistory() {
    return this.http.get<any>(`${this.apiUrlHistory}/transaction/all`);
  }

  getHistoryById(id: string) {
    return this.http.get<any>(`${this.apiUrlHistory}/transaction/user/${id}`);
  }
}
