/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.senac.app.Repository;

import com.senac.app.models.Analise;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kevin
 */

public interface AnaliseRepository extends JpaRepository<Analise, Long> {
    List<Analise> findByFilmeId(Long filmeId);
}
