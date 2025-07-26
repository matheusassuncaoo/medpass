package com.br.medpass.medpass.repository;

import com.br.medpass.medpass.model.Senha;
import com.br.medpass.medpass.model.Fila;
import com.br.medpass.medpass.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SenhaRepository extends JpaRepository<Senha, Long> {
    List<Senha> findByFila(Fila fila);
    List<Senha> findByPaciente(Paciente paciente);
    List<Senha> findByFilaAndStatus(Fila fila, String status);
} 