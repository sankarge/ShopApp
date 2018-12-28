package com.idealo.exercise.repository;

import com.idealo.exercise.model.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Long> {
}