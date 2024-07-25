import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(body:User):Observable<User>{
    return this.http.post<User>(`${this.BASE_API}/auth/register`, body)
  }

  login(body:User):Observable<any>{
    return this.http.post(`${this.BASE_API}/auth/login`, body)
  }

}
