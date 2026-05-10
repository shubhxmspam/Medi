import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clinic } from '../../models/Clinic';
import { Doctor } from '../../models/Doctor';
import { MediConnectService } from '../../services/mediconnect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliniccreate',
  templateUrl: './cliniccreate.component.html',
  styleUrls: ['./cliniccreate.component.scss']
})
export class ClinicCreateComponent implements OnInit {

  clinicForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  doctor!: Doctor;
  doctorId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private mediconnectService: MediConnectService, private router: Router
  ) { }

  ngOnInit(): void {
    const doctorId = Number(localStorage.getItem('doctor_id'));

    this.clinicForm = this.formBuilder.group({
      doctor: [{ value: '', disabled: true }],
      clinicId: [null],
      clinicName: ['', [Validators.required, Validators.minLength(2)]],
      location: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      establishedYear: [
        null,
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear())
        ]
      ],
    });

    this.mediconnectService.getDoctorById(doctorId).subscribe({
      next: (response) => {
        this.doctor = response;
        this.clinicForm.patchValue({
          doctor: this.doctor.fullName
        });
      },
      error: (error) => {
        console.log('Error loading loggedIn doctor details', error);
      },
    });
  }

  get clinicName() {
    return this.clinicForm.get('clinicName');
  }

  get location() {
    return this.clinicForm.get('location');
  }

  get contactNumber() {
    return this.clinicForm.get('contactNumber');
  }

  get establishedYear() {
    return this.clinicForm.get('establishedYear');
  }

  onSubmit(): void {
    // if (this.clinicForm.invalid) {
    //   this.clinicForm.markAllAsTouched();
    //   this.errorMessage = 'Please fill all required fields correctly.';
    //   return;
    // }

    // //  FIXED: send doctorId as number, not whole doctor object
    // const clinicPayload = {
    //   ...this.clinicForm.value,
    //   doctorId: this.doctorId
    // };

    // console.log('Creating clinic:', clinicPayload);

    // this.mediconnectService.addClinic(clinicPayload).subscribe({
    //   next: () => {
    //     this.successMessage = 'Clinic created successfully!';
    //     this.errorMessage = '';
    //     setTimeout(() => this.router.navigate(['mediconnect']), 1500);
    //   },
    //   error: (err) => {
    //     console.error('Create clinic failed:', err);
    //     if (err.status === 400) {
    //       this.errorMessage = 'Bad request. Please check your input.';
    //     } else if (err.status === 401) {
    //       this.errorMessage = 'Unauthorized. Please login again.';
    //     } else {
    //       this.errorMessage = err?.error?.message || 'An unexpected error occurred.';
    //     }
    //     this.successMessage = '';
    //   }
    // });
    if (this.clinicForm.valid) {
      const clinic: Clinic = {
        ...this.clinicForm.getRawValue(),
        doctor: this.doctor,
      };
      this.mediconnectService.addClinic(clinic).subscribe({
        next: (response) => {
          this.errorMessage = null;
          console.log(response);
          this.clinicForm.reset();
          this.successMessage = 'Clinic created successfully!';
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    }
  }

  resetForm(): void {
    this.clinicForm.reset();

    if (this.doctor) {
      this.clinicForm.patchValue({
        doctor: this.doctor.fullName
      });
    }

    this.successMessage = null;
    this.errorMessage = null;
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      this.errorMessage = `Server-side error: ${error.status} ${error.message}`;

      if (error.status === 400) {
        this.errorMessage = 'Bad request. Please check your input.';
      }
    }

    this.successMessage = null;
  }
}