package com.edutech.progressive.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.edutech.progressive.entity.Clinic;

@Repository
public interface ClinicRepository extends JpaRepository<Clinic, Integer> {
    Optional<Clinic> findByClinicId(int clinicId);
    List<Clinic> findAllByLocation(String location);
    @Query("SELECT c FROM Clinic c WHERE c.doctor.doctorId = :doctorId")
    List<Clinic> findAllByDoctorId(int doctorId);
    @Modifying
    @Transactional
    @Query("DELETE FROM Clinic c WHERE c.doctor.doctorId = :doctorId")
    void deleteByDoctorId(int doctorId);
    Optional<Clinic> findByClinicName(String clinicName);
}