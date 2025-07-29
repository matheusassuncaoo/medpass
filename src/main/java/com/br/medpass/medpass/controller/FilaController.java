package com.br.medpass.medpass.controller;

import com.br.medpass.medpass.model.Fila;
import com.br.medpass.medpass.model.Hospital;
import com.br.medpass.medpass.model.Especialidade;
import com.br.medpass.medpass.service.FilaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/filas")
public class FilaController {

    private final FilaService filaService;

    @Autowired
    public FilaController(FilaService filaService) {
        this.filaService = filaService;
    }

    @GetMapping
    public ResponseEntity<List<Fila>> listarTodasFilas() {
        List<Fila> filas = filaService.listarTodos();
        return ResponseEntity.ok(filas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fila> buscarFilaPorId(@PathVariable Long id) {
        return filaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fila não encontrada"));
    }

    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<List<Fila>> buscarFilasPorHospital(@PathVariable Long hospitalId) {
        Hospital hospital = new Hospital();
        hospital.setId(hospitalId);
        List<Fila> filas = filaService.buscarPorHospital(hospital);
        return ResponseEntity.ok(filas);
    }

    @GetMapping("/especialidade/{especialidadeId}")
    public ResponseEntity<List<Fila>> buscarFilasPorEspecialidade(@PathVariable Long especialidadeId) {
        Especialidade especialidade = new Especialidade();
        especialidade.setId(especialidadeId);
        List<Fila> filas = filaService.buscarPorEspecialidade(especialidade);
        return ResponseEntity.ok(filas);
    }

    @GetMapping("/hospital/{hospitalId}/ativas")
    public ResponseEntity<List<Fila>> buscarFilasAtivasPorHospital(@PathVariable Long hospitalId) {
        Hospital hospital = new Hospital();
        hospital.setId(hospitalId);
        List<Fila> filas = filaService.buscarFilasAtivasPorHospital(hospital);
        return ResponseEntity.ok(filas);
    }

    @PostMapping
    public ResponseEntity<Fila> criarFila(@RequestBody Fila fila) {
        try {
            Fila novaFila = filaService.salvar(fila);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaFila);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro ao criar fila: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fila> atualizarFila(@PathVariable Long id, @RequestBody Fila fila) {
        try {
            if (!id.equals(fila.getId())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID da URL não corresponde ao ID do corpo da requisição");
            }
            Fila filaAtualizada = filaService.atualizar(id, fila);
            return ResponseEntity.ok(filaAtualizada);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void desativarFila(@PathVariable Long id) {
        try {
            filaService.desativar(id);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping("/{id}/ativar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void ativarFila(@PathVariable Long id) {
        try {
            filaService.ativar(id);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleResponseStatusException(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(ex.getReason());
    }
}
