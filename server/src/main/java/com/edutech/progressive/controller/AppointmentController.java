package com.edutech.progressive.controller;

import com.edutech.progressive.entity.Appointment;
import com.edutech.progressive.service.AppointmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return new ResponseEntity<>(appointmentService.getAllAppointments(),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Integer> createAppointment(@RequestBody Appointment appointment) {
        return new ResponseEntity<>(appointmentService.createAppointment(appointment), HttpStatus.CREATED);
    }

    @PutMapping("/{appointmentID}")
    public ResponseEntity<Void> updateAppointment(@PathVariable("appointmentID") int appointmentId, @RequestBody Appointment appointment) {
        appointment.setAppointmentId(appointmentId);
        appointmentService.updateAppointment(appointment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{appointmentID}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable("appointmentID") int appointmentId) {
        return new ResponseEntity<>(appointmentService.getAppointmentById(appointmentId), HttpStatus.OK);
    }

    @GetMapping("/clinic/{clinicID}")
    public ResponseEntity<List<Appointment>> getAppointmentByClinic(@PathVariable("clinicID") int clinicId) {
        return new ResponseEntity<>(appointmentService.getAppointmentByClinic(clinicId), HttpStatus.OK);
    }

    @GetMapping("/patient/{patientID}")
    public ResponseEntity<List<Appointment>> getAppointmentByPatient(@PathVariable("patientID") int patientId) {
        return new ResponseEntity<>(appointmentService.getAppointmentByPatient(patientId), HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Appointment>> getAppointmentByStatus(@PathVariable String status) {
        return new ResponseEntity<>(appointmentService.getAppointmentByStatus(status), HttpStatus.OK);
    }
}