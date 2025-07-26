package com.br.medpass.medpass.service;

import com.br.medpass.medpass.model.Hospital;
import com.br.medpass.medpass.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    public List<Hospital> listarTodos() {
        return hospitalRepository.findAll();
    }

    public Optional<Hospital> buscarPorId(Long id) {
        return hospitalRepository.findById(id);
    }

    public Hospital salvar(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public Hospital atualizar(Long id, Hospital hospital) {
        if (!hospitalRepository.existsById(id)) {
            throw new RuntimeException("Hospital não encontrado");
        }
        hospital.setId(id);
        return hospitalRepository.save(hospital);
    }

    public void deletar(Long id) {
        if (!hospitalRepository.existsById(id)) {
            throw new RuntimeException("Hospital não encontrado");
        }
        hospitalRepository.deleteById(id);
    }
} 