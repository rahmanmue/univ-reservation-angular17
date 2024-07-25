import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserProfileRequestBody } from '../interface/user-profile';
import { Observable } from 'rxjs';

interface User {
  id: string
}

interface BodyRequestUser {
  id: string;
  nim:number;
  fullName: string;
  dateofbirth: string;
  phone: string;
  photo: string
  user: User
}


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private BASE_API = environment.apiUrl

  constructor(private http: HttpClient) { }

  getProfileByUserId(id_user:string): Observable<UserProfileRequestBody>{
    return this.http.get<UserProfileRequestBody>(`${this.BASE_API}/profile/${id_user}`)
  }

  updateProfile(formData:FormData){
    return this.http.put<UserProfileRequestBody>(`${this.BASE_API}/profile/update`, formData)
  }

  updateProfileWithoutPhoto(body:BodyRequestUser){
    return this.http.put(`${this.BASE_API}/profile`, body)
  }

  updatePassword(id:string, body:any){
    return this.http.put(`${this.BASE_API}/user/${id}`, body)
  }

}
