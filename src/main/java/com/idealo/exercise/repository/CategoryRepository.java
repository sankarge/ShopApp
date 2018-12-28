package com.idealo.exercise.repository;

import com.idealo.exercise.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}