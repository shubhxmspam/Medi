package com.edutech.progressive.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.entity.Clinic;
import com.edutech.progressive.service.ClinicService;

public class ClinicServiceImplJdbc implements ClinicService  {

    @Override
    public List<Clinic> getAllClinics() {
        return new ArrayList<>();
    }

    @Override
    public Clinic getClinicById(int clinicId) {
        return null;
    }

    @Override
    public Integer addClinic(Clinic clinic) {
        return -1;
    }

    @Override
    public void updateClinic(Clinic clinic) {
        
    }

    @Override
    public void deleteClinic(int clinicId) {
       
    }

}