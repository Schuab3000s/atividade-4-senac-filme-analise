package com.senac.app.services;

import java.util.List;
import com.senac.app.Repository.AnaliseRepository;
import com.senac.app.models.Analise;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author kevin
 */
@Service
public class AnaliseService {

    @Autowired
    private AnaliseRepository analiseRepository;

    public List<Analise> listarTodos() {
        return analiseRepository.findAll();
    }

    public Optional<Analise> buscarPorId(Long id) {
        return analiseRepository.findById(id);
    }

    public Analise salvar(Analise analise) {
        return analiseRepository.save(analise);
    }

    public void deletar(Long id) {
        analiseRepository.deleteById(id);
    }

    public List<Analise> listarPorFilmeId(Long filmeId) {
        return analiseRepository.findByFilmeId(filmeId);
    }
}

