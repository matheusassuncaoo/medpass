package com.br.medpass.medpass.service;

import com.br.medpass.medpass.model.Senha;
import com.br.medpass.medpass.model.Fila;
import com.br.medpass.medpass.model.Paciente;
import com.br.medpass.medpass.repository.SenhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SenhaService {

    @Autowired
    private SenhaRepository senhaRepository;

    public List<Senha> listarTodos() {
        return senhaRepository.findAll();
    }

    public Optional<Senha> buscarPorId(Long id) {
        return senhaRepository.findById(id);
    }

    public List<Senha> buscarPorFila(Fila fila) {
        return senhaRepository.findByFila(fila);
    }

    public List<Senha> buscarPorPaciente(Paciente paciente) {
        return senhaRepository.findByPaciente(paciente);
    }

    public List<Senha> buscarPorFilaEStatus(Fila fila, String status) {
        return senhaRepository.findByFilaAndStatus(fila, status);
    }

    public Senha salvar(Senha senha) {
        // Gerar número sequencial da senha
        List<Senha> senhasDaFila = senhaRepository.findByFila(senha.getFila());
        int proximoNumero = senhasDaFila.size() + 1;
        senha.setNumero(proximoNumero);
        senha.setStatus("aguardando");
        return senhaRepository.save(senha);
    }

    public Senha chamarSenha(Long id, Long guicheId) {
        Optional<Senha> senhaOpt = senhaRepository.findById(id);
        if (senhaOpt.isPresent()) {
            Senha senha = senhaOpt.get();
            senha.setStatus("chamada");
            senha.setDataChamada(LocalDateTime.now());
            // Aqui você pode adicionar a lógica para associar o guichê
            return senhaRepository.save(senha);
        }
        throw new RuntimeException("Senha não encontrada");
    }

    public Senha atualizar(Long id, Senha senha) {
        if (!senhaRepository.existsById(id)) {
            throw new RuntimeException("Senha não encontrada");
        }
        senha.setId(id);
        return senhaRepository.save(senha);
    }

    public void deletar(Long id) {
        if (!senhaRepository.existsById(id)) {
            throw new RuntimeException("Senha não encontrada");
        }
        senhaRepository.deleteById(id);
    }
} 