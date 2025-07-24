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

@Data
@Entity
@Table(name = "filas")
public class Fila {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String nome;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "especialidade_id")
    private Especialidade especialidade;

    private boolean ativa = true;

    @NotNull
    private LocalDateTime criadoEm = LocalDateTime.now();
} 