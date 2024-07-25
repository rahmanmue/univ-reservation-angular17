import { Component, ElementRef, ViewChild } from '@angular/core';
import { TemplateUserComponent } from '../../shared/template-user/template-user.component';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedService } from '../../services/shared.service';
import { ProfileService } from '../../services/profile.service';
import { TypeFacilityPipe } from '../../pipe/type-facility.pipe';
import { StorageFirebaseService } from '../../services/storage-firebase.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Submission } from '../../interface/submission';
import { SubmissionService } from '../../services/submission.service';
import { UPLOAD_PATH } from '../../shared/constant/PATH_UPLOAD';
import Swal from 'sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-submission',
  standalone: true,
  imports: [
    TemplateUserComponent,
    TypeFacilityPipe,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.scss'
})
export class SubmissionComponent {
  File!: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = true;
  selectedFacility: any;
  userProfile!: any;
  userId: string = localStorage.getItem('userId') as string;
  profileId!: string;
  file: File | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private submissionService: SubmissionService,
    private sharedService: SharedService,
    private profileService: ProfileService,
    private storage: StorageFirebaseService, 
    private snackBar: MatSnackBar
  ) {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      model: ['Minjam',],
      admission: ['Rent', Validators.required],
      facility: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      uploadDocs: ['', ]
    });
  }

  ngOnInit() {
    this.selectedFacility = this.sharedService.getSelectedFacility();
    if (this.selectedFacility) {
      this.firstFormGroup.patchValue({
        facility: this.selectedFacility.typeFacilities
      });
      this.secondFormGroup.patchValue({
        name: this.selectedFacility.name
      });
    }
    this.profileService.getProfileByUserId(this.userId).subscribe({
      next: (data) => {
        this.userProfile = data;
        this.profileId = this.userProfile.data.id;
        this.firstFormGroup.patchValue({
          name: this.userProfile.data.fullName,
          phone: this.userProfile.data.phone,
        });
      },
      error: (err) => {
        console.error('Error fetching profile data:', err);
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    let firstData: any = this.firstFormGroup;
    let secondData: any = this.secondFormGroup;
    console.log(firstData.valid);
    console.log(secondData.valid)
    console.log(this.file);
    
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.file) {
      const path = `${UPLOAD_PATH.document}/${this.file.name}`;
      this.storage.uploadFile(path, this.file).subscribe({
        next: (downloadURL) => {
          const submission: Submission = {
            id_profile: this.profileId,
            subject: this.firstFormGroup.value.admission,
            document: downloadURL,
            dateReservation: this.secondFormGroup.value.startDate,
            dateReturn: this.secondFormGroup.value.endDate,
            transactionDetail: [{
              idFac: this.selectedFacility.id,
              quantity: Number(this.secondFormGroup.value.quantity),
              price: this.selectedFacility.price || 0
            }]
          };

          this.submissionService.addSubmission(submission).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Congratulation...',
                text: 'Submission berhasil ditambahkan',
                confirmButtonColor: '#034C62'
              });
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan, coba lagi nanti',
                confirmButtonColor: '#034C62'
              });
            }
          });
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          this.snackBar.open('Error uploading file. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Form tidak valid, isi data dengan benar',
        confirmButtonColor: '#034C62'
      });
    }
  }
  nowDate() {
        return new Date().toISOString().split('T')[0]
      }
    
      endDate!: string;
    
      onChangeEndDate(e: any) {
        let target = e.target.value
        console.log(target);
        this.endDate = target
        // return target
      }
}
