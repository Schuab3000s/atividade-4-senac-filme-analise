package com.senac.app.Repository;

import com.senac.app.models.Filme;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kevin
 */
public interface FilmeRepository extends JpaRepository<Filme, Long> {
}
