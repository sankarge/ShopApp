package com.idealo.exercise.repository;

import com.idealo.exercise.model.Item;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {

}