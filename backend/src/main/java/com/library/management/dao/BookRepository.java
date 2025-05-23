package com.library.management.dao;

import com.library.management.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
@RepositoryRestResource
public interface BookRepository extends JpaRepository<Book, Long>{

    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Book> findByCategoryContaining(@RequestParam("category") String category, Pageable pageable);

}
