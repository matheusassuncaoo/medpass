package com.br.medpass.medpass.controller;

import com.br.medpass.medpass.model.Senha;
import com.br.medpass.medpass.model.Fila;
import com.br.medpass.medpass.model.Paciente;
import com.br.medpass.medpass.service.SenhaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/senhas")
public class SenhaController {

    private final SenhaService senhaService;

    public SenhaController(SenhaService senhaService) {
        this.senhaService = senhaService;
    }

    @GetMapping
    public ResponseEntity<List<Senha>> listarTodasSenhas() {
        List<Senha> senhas = senhaService.listarTodos();
        return ResponseEntity.ok(senhas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Senha> buscarSenhaPorId(@PathVariable Long id) {
        return senhaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Senha não encontrada"));
    }

    @GetMapping("/fila/{filaId}")
    public ResponseEntity<List<Senha>> buscarSenhasPorFila(@PathVariable Long filaId) {
        Fila fila = new Fila();
        fila.setId(filaId);
        List<Senha> senhas = senhaService.buscarPorFila(fila);
        return ResponseEntity.ok(senhas);
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Senha>> buscarSenhasPorPaciente(@PathVariable Long pacienteId) {
        Paciente paciente = new Paciente();
        paciente.setId(pacienteId);
        List<Senha> senhas = senhaService.buscarPorPaciente(paciente);
        return ResponseEntity.ok(senhas);
    }

    @GetMapping("/fila/{filaId}/status/{status}")
    public ResponseEntity<List<Senha>> buscarSenhasPorFilaEStatus(
            @PathVariable Long filaId,
            @PathVariable String status) {
        Fila fila = new Fila();
        fila.setId(filaId);
        List<Senha> senhas = senhaService.buscarPorFilaEStatus(fila, status);
        return ResponseEntity.ok(senhas);
    }

    @PostMapping
    public ResponseEntity<Senha> emitirSenha(@RequestBody Senha senha) {
        try {
            Senha novaSenha = senhaService.salvar(senha);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaSenha);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/{id}/chamar")
    public ResponseEntity<Senha> chamarSenha(
            @PathVariable Long id,
            @RequestParam(required = false) Long guicheId) {
        try {
            Senha senhaChamada = senhaService.chamarSenha(id, guicheId);
            return ResponseEntity.ok(senhaChamada);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping("/{id}/atender")
    public ResponseEntity<Senha> atenderSenha(@PathVariable Long id) {
        try {
            Senha senhaAtendida = senhaService.atenderSenha(id);
            return ResponseEntity.ok(senhaAtendida);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Senha> cancelarSenha(@PathVariable Long id) {
        try {
            Senha senhaCancelada = senhaService.cancelarSenha(id);
            return ResponseEntity.ok(senhaCancelada);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleResponseStatusException(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(ex.getReason());
    }
}
