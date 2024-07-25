import { Injectable } from '@angular/core';
import { Storage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from '@angular/fire/storage';
import { provideRouter } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageFirebaseService {

  constructor(private storage:Storage) {}

  uploadFile(filePath: string, file: File): Observable<string>{
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Observable(observer => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          
        }, 
        (error) => {
          observer.error(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            observer.next(downloadURL);
            observer.complete();
          }).catch(error => {
           
              
          });
        }
      );
    });
  }

  deleteFile(filePath: string): Observable<void> {
    const fileRef = ref(this.storage, filePath);
    return from(deleteObject(fileRef));
  }
  
}
