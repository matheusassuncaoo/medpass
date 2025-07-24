package com.br.medpass.medpass.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.Data;
import java.time.LocalDateTime;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.PastOrPresent;

@Data
@Entity
@Table(name = "senhas")
public class Senha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "fila_id")
    private Fila fila;

    @NotBlank
    @Size(max = 20)
    private String status; // aguardando, chamada, atendida, cancelada

    @NotNull
    @PastOrPresent
    private LocalDateTime dataEmissao = LocalDateTime.now();

    @PastOrPresent
    private LocalDateTime dataChamada;

    private Guiche guiche;

    @NotNull
    private Integer numero;
} 