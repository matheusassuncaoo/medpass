package com.br.medpass.medpass.service;

import com.br.medpass.medpass.model.Fila;
import com.br.medpass.medpass.model.Hospital;
import com.br.medpass.medpass.model.Especialidade;
import com.br.medpass.medpass.repository.FilaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilaService {

    @Autowired
    private FilaRepository filaRepository;

    public List<Fila> listarTodos() {
        return filaRepository.findAll();
    }

    public Optional<Fila> buscarPorId(Long id) {
        return filaRepository.findById(id);
    }

    public List<Fila> buscarPorHospital(Hospital hospital) {
        return filaRepository.findByHospital(hospital);
    }

    public List<Fila> buscarPorEspecialidade(Especialidade especialidade) {
        return filaRepository.findByEspecialidade(especialidade);
    }

    public List<Fila> buscarFilasAtivasPorHospital(Hospital hospital) {
        return filaRepository.findByHospitalAndAtivaTrue(hospital);
    }

    public Fila salvar(Fila fila) {
        return filaRepository.save(fila);
    }

    public Fila atualizar(Long id, Fila fila) {
        if (!filaRepository.existsById(id)) {
            throw new RuntimeException("Fila não encontrada");
        }
        fila.setId(id);
        return filaRepository.save(fila);
    }

    public void desativar(Long id) {
        Fila fila = filaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fila não encontrada"));
        fila.setAtiva(false);
        filaRepository.save(fila);
    }

    public void ativar(Long id) {
        Fila fila = filaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fila não encontrada"));
        fila.setAtiva(true);
        filaRepository.save(fila);
    }

    public void deletar(Long id) {
        if (!filaRepository.existsById(id)) {
            throw new RuntimeException("Fila não encontrada");
        }
        filaRepository.deleteById(id);
    }
} 