import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clinic } from '../../models/Clinic';
import { Patient } from '../../models/Patient';
import { MediConnectService } from '../../services/mediconnect.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Appointment } from '../../models/Appointment';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentCreateComponent implements OnInit {
  appointmentForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  clinics: Clinic[] = [];
  selectedPatient!: Patient;
  patientId!: number;

  constructor(private fb: FormBuilder, private service: MediConnectService) { }

  ngOnInit(): void {
    this.patientId = Number(localStorage.getItem('patient_id'));

    this.service.getPatientById(this.patientId).subscribe({
      next: (response) => {
        this.selectedPatient = response;
      },
      error: (error) => console.log('Error loading selectedPatient', error)
    });

    this.appointmentForm = this.fb.group({
      patientId: [{ value: this.patientId, disabled: true }],
      clinic: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      status: ['Pending', [Validators.required]],
      purpose: ['', [Validators.required]]
    });

    this.service.getAllClinics().subscribe({
      next: (c) => (this.clinics = c)
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const appointment: Appointment = {
        ...this.appointmentForm.getRawValue(),
        patient: this.selectedPatient,
      };
      this.service.createAppointment(appointment).subscribe({
        next: (response) => {
          this.errorMessage = null;
          console.log(response);
          this.appointmentForm.reset();
          this.successMessage = 'Appointment created successfully!';
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = null;
    }
  }

  // onSubmit(): void {
  //   // this.successMessage = null;
  //   // this.errorMessage = null;

  //   if (this.appointmentForm.invalid) {
  //     this.errorMessage = 'Please fix the errors before submitting.';
  //     this.successMessage = null;
  //     return;
  //   }

  //   const payload = {
  //     appointmentId: 0,
  //     patientId: this.patientId,
  //     clinicId: this.appointmentForm.value.clinicId,
  //     appointmentDate: this.appointmentForm.value.appointmentDate,
  //     status: this.appointmentForm.value.status,
  //     purpose: this.appointmentForm.value.purpose
  //   };

  //   this.service.createAppointment(payload as any).subscribe({
  //     next: () => {
  //       this.successMessage = 'Appointment created successfully!';
  //       this.errorMessage = null;
  //       this.appointmentForm.reset({
  //         patientId: this.patientId,
  //         clinicId: null,
  //         appointmentDate: '',
  //         status: 'Scheduled',
  //         purpose: ''
  //       });
  //     },
  //     error: (err: HttpErrorResponse) => this.handleError(err)
  //   });
  // }

  private handleError(error: HttpErrorResponse): void {
    if (typeof error.error === 'string') this.errorMessage = error.error;
    else if (error.message) this.errorMessage = error.message;
    else this.errorMessage = 'Failed to create appointment.';
  }

  get clinicId() { return this.appointmentForm.get('clinicId'); }
  get appointmentDate() { return this.appointmentForm.get('appointmentDate'); }
  get status() { return this.appointmentForm.get('status'); }
  get purpose() { return this.appointmentForm.get('purpose'); }
}