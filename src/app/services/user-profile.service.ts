import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private urlApiUser = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserData() : Observable<any> {
    return this.http.get(`${this.urlApiUser}/profile`);
  }

  getUserDataById(id:string){
    return this.http.get(`${this.urlApiUser}/profile/${id}`);
  }

  deleteUserData(id: string){
    return this.http.delete(`${this.urlApiUser}/profile/${id}`);
  }

  postUserData(FormGroup : FormGroup) : Observable<any> {
    return this.http.post(`${this.urlApiUser}/admin/users/student`, FormGroup.value)
  }

  editUserData(FormGroup : FormGroup, id : string) : Observable<any> {
    return this.http.put(`${this.urlApiUser}/user/student/${id}`, FormGroup.value)
  }

}
