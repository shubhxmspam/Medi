package com.edutech.progressive.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Appointment;
import com.edutech.progressive.repository.AppointmentRepository;
import com.edutech.progressive.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    AppointmentRepository ar;

    @Override
    public List<Appointment> getAllAppointments() {
        return ar.findAll();
    }

    @Override
    public int createAppointment(Appointment appointment) {
        Appointment a = ar.save(appointment);
        return a.getAppointmentId();
    }

    @Override
    @Transactional
    public void updateAppointment(Appointment appointment) {
        ar.save(appointment);
    }

    @Override
    public Appointment getAppointmentById(int appointmentId) {
        return ar.findById(appointmentId).get();
    }

    @Override
    public List<Appointment> getAppointmentByClinic(int clinicId) {
        return ar.findByClinic_ClinicId(clinicId);
    }

    @Override
    public List<Appointment> getAppointmentByPatient(int patientId) {
        return ar.findByPatient_PatientId(patientId);
    }

    @Override
    public List<Appointment> getAppointmentByStatus(String status) {
        return ar.findByStatus(status);
    }

}