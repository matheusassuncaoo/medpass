package com.br.medpass.medpass.repository;

import com.br.medpass.medpass.model.Fila;
import com.br.medpass.medpass.model.Hospital;
import com.br.medpass.medpass.model.Especialidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilaRepository extends JpaRepository<Fila, Long> {
    List<Fila> findByHospital(Hospital hospital);
    List<Fila> findByEspecialidade(Especialidade especialidade);
    List<Fila> findByHospitalAndAtivaTrue(Hospital hospital);
} 