package com.edutech.progressive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.edutech.progressive.entity.Billing;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Integer> {

    List<Billing> findAllByPatient_PatientId(int PatientId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Billing b WHERE b.patient.patientId = :patientId")
    void deleteByPatientId(@Param("patientId") int patientId);
}