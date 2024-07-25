import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Facility } from '../interface/facility';
import { Submission } from '../interface/submission';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private BASE_API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addSubmission(body: Submission): Observable<any> {
    return this.http.post(`${this.BASE_API}/transaction/submission`, body);
  }
}
