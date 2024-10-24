package com.senac.app.controller;

import com.senac.app.models.Analise;
import com.senac.app.services.AnaliseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/analises")
@CrossOrigin
public class AnaliseController {

    @Autowired
    private AnaliseService analiseService;

    @GetMapping
    public List<Analise> listarTodas() {
        return analiseService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Analise> buscarPorId(@PathVariable Long id) {
        return analiseService.buscarPorId(id)
                .map(analise -> ResponseEntity.ok(analise))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Analise> salvar(@Valid @RequestBody Analise analise) {
        Analise salvo = analiseService.salvar(analise);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Analise> atualizar(@PathVariable Long id, @Valid @RequestBody Analise analise) {
        return analiseService.buscarPorId(id)
                .map(a -> {
                    analise.setId(id);
                    Analise atualizado = analiseService.salvar(analise);
                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (analiseService.buscarPorId(id).isPresent()) {
            analiseService.deletar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
