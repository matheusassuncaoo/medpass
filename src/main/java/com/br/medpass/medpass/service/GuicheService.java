package com.br.medpass.medpass.service;

import com.br.medpass.medpass.model.Guiche;
import com.br.medpass.medpass.model.Hospital;
import com.br.medpass.medpass.repository.GuicheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuicheService {

    @Autowired
    private GuicheRepository guicheRepository;

    public List<Guiche> listarTodos() {
        return guicheRepository.findAll();
    }

    public Optional<Guiche> buscarPorId(Long id) {
        return guicheRepository.findById(id);
    }

    public List<Guiche> buscarPorHospital(Hospital hospital) {
        return guicheRepository.findByHospital(hospital);
    }

    public Guiche salvar(Guiche guiche) {
        return guicheRepository.save(guiche);
    }

    public Guiche atualizar(Long id, Guiche guiche) {
        if (!guicheRepository.existsById(id)) {
            throw new RuntimeException("Guichê não encontrado");
        }
        guiche.setId(id);
        return guicheRepository.save(guiche);
    }

    public void deletar(Long id) {
        if (!guicheRepository.existsById(id)) {
            throw new RuntimeException("Guichê não encontrado");
        }
        guicheRepository.deleteById(id);
    }
} 