// package com.edutech.progressive.service.impl;

// import java.util.ArrayList;
// import java.util.Collections;
// import java.util.List;

// import org.springframework.stereotype.Service;

// import com.edutech.progressive.dao.PatientDAO;
// import com.edutech.progressive.dto.PatientDTO;
// import com.edutech.progressive.entity.Patient;
// import com.edutech.progressive.service.PatientService;

// @Service
// public class PatientServiceImplJdbc implements PatientService {

//     PatientDAO patientDAO;

//     public PatientServiceImplJdbc(PatientDAO patientDAO) {
//         this.patientDAO = patientDAO;
//     }

//     @Override
//     public List<Patient> getAllPatients() throws Exception {

//         return patientDAO.getAllPatients();

//     }

//     @Override
//     public Integer addPatient(PatientDTO patientDTO) throws Exception {

//        return patientDAO.addPatient(patientDTO);

//     }

//     @Override
//     public List<Patient> getAllPatientSortedByName() throws Exception {
//         List<Patient> list = new ArrayList<>(patientDAO.getAllPatients());
//         Collections.sort(list);
//         return list;

//     }

//     public void updatePatient(Patient patient) throws Exception {
//         patientDAO.updatePatient(patient);

//     }

//     public void deletePatient(int patientId) throws Exception {

//         patientDAO.deletePatient(patientId);

//     }

//     public Patient getPatientById(int patientId) throws Exception {

//         return patientDAO.getPatientById(patientId);

//     }
// }