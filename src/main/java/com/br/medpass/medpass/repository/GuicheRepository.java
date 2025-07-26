package com.br.medpass.medpass.repository;

import com.br.medpass.medpass.model.Guiche;
import com.br.medpass.medpass.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuicheRepository extends JpaRepository<Guiche, Long> {
    List<Guiche> findByHospital(Hospital hospital);
} 