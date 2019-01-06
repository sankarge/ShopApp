package com.idealo.exercise.repository;

import com.idealo.exercise.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {

    Page<Item> findByCategory_IdAndPriceBetween(@Param("id") Long id, BigDecimal min, BigDecimal max, Pageable pageable);
}