package com.senac.app.controller;

import com.senac.app.models.Filme;
import com.senac.app.services.FilmeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/filmes")
@CrossOrigin
public class FilmeController {

    @Autowired
    private FilmeService filmeService;

    @GetMapping
    public List<Filme> listarTodos() {
        return filmeService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> buscarPorId(@PathVariable Long id) {
        return filmeService.buscarPorId(id)
                .map(filme -> ResponseEntity.ok(filme))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Filme> salvar(@Valid @RequestBody Filme filme) {
        Filme salvo = filmeService.salvar(filme);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filme> atualizar(@PathVariable Long id, @Valid @RequestBody Filme filme) {
        return filmeService.buscarPorId(id)
                .map(f -> {
                    filme.setId(id);
                    Filme atualizado = filmeService.salvar(filme);
                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (filmeService.buscarPorId(id).isPresent()) {
            filmeService.deletar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
