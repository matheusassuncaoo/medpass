package com.br.medpass.medpass.service;

import com.br.medpass.medpass.model.Paciente;
import com.br.medpass.medpass.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public Optional<Paciente> buscarPorCpf(String cpf) {
        return pacienteRepository.findByCpf(cpf);
    }

    public Paciente salvar(Paciente paciente) {
        if (pacienteRepository.existsByCpf(paciente.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }
        return pacienteRepository.save(paciente);
    }

    public Paciente atualizar(Long id, Paciente paciente) {
        if (!pacienteRepository.existsById(id)) {
            throw new RuntimeException("Paciente não encontrado");
        }
        paciente.setId(id);
        return pacienteRepository.save(paciente);
    }

    public void deletar(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new RuntimeException("Paciente não encontrado");
        }
        pacienteRepository.deleteById(id);
    }
} 