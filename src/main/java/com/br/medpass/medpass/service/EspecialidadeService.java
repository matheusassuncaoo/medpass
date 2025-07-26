package com.br.medpass.medpass.service;

import com.br.medpass.medpass.model.Especialidade;
import com.br.medpass.medpass.repository.EspecialidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspecialidadeService {

    @Autowired
    private EspecialidadeRepository especialidadeRepository;

    public List<Especialidade> listarTodos() {
        return especialidadeRepository.findAll();
    }

    public Optional<Especialidade> buscarPorId(Long id) {
        return especialidadeRepository.findById(id);
    }

    public Optional<Especialidade> buscarPorNome(String nome) {
        return especialidadeRepository.findByNome(nome);
    }

    public Especialidade salvar(Especialidade especialidade) {
        return especialidadeRepository.save(especialidade);
    }

    public Especialidade atualizar(Long id, Especialidade especialidade) {
        if (!especialidadeRepository.existsById(id)) {
            throw new RuntimeException("Especialidade não encontrada");
        }
        especialidade.setId(id);
        return especialidadeRepository.save(especialidade);
    }

    public void deletar(Long id) {
        if (!especialidadeRepository.existsById(id)) {
            throw new RuntimeException("Especialidade não encontrada");
        }
        especialidadeRepository.deleteById(id);
    }
} 