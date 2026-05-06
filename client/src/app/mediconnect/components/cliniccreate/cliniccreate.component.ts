import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clinic } from '../../models/Clinic';
import { Doctor } from '../../models/Doctor';
import { MediConnectService } from '../../services/mediconnect.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private mediconnectService: MediConnectService
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
    if (this.clinicForm.invalid) {
      this.clinicForm.markAllAsTouched();
      this.errorMessage = 'Please fill all clinic details correctly.';
      this.successMessage = null;
      return;
    }

    const clinic: Clinic = {
      ...this.clinicForm.getRawValue(),
      doctor: this.doctor,
    };

    this.mediconnectService.addClinic(clinic).subscribe({
      next: (response) => {
        this.errorMessage = null;
        console.log(response);

        this.resetForm();

        this.successMessage = 'Clinic created successfully!';
      },
      error: (error) => {
        this.handleError(error);
      }
    });
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