package com.idealo.exercise.util;

import com.idealo.exercise.model.Category;
import com.idealo.exercise.model.Item;
import com.idealo.exercise.repository.CategoryRepository;
import com.idealo.exercise.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class SampleRecordsLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Autowired
    public SampleRecordsLoader(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        populateMockItemsFromCSV();
        populateDummyRecords();
    }

    private void populateDummyRecords() {
        List<Category> categoryList = IntStream.range(4, 11)
                .mapToObj(i -> new Category("Category-" + i))
                .peek(cat -> cat.setItems(IntStream.range(1, 1001)
                        .mapToObj(j -> new Item(cat, cat.getTitle() + " Item-" + j, "Description of " + cat.getTitle() + "-Item-" + j, 10L * j))
                        .collect(Collectors.toList())))
                .collect(Collectors.toList());
        this.categoryRepository.saveAll(categoryList);
    }

    private void populateMockItemsFromCSV() throws IOException, URISyntaxException {
        Map<String, Category> categories = new HashMap<>();
        URI uri = this.getClass().getResource("/records.csv").toURI();
        Files.lines(Paths.get(uri)).forEach(line -> {
            String[] parts = line.split(",");
            String categoryString = parts[0];
            categories.putIfAbsent(categoryString, createCategory(categoryString));
            Category category = categories.get(categoryString);
            category.addItem(new Item(category, parts[1], parts[2], Long.parseLong(parts[3])));
        });
        this.categoryRepository.saveAll(categories.values());
    }

    private Category createCategory(String part) {
        Category category = new Category(part);
        category.setItems(new ArrayList<>());
        return category;
    }
}