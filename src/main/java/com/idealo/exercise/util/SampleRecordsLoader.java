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
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class SampleRecordsLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    private ItemRepository itemRepository;

    @Autowired
    public SampleRecordsLoader(CategoryRepository categoryRepository, ItemRepository itemRepository) {
        this.categoryRepository = categoryRepository;
        this.itemRepository = itemRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
//        Category category = this.categoryRepository.save(new Category("SmartPhones"));
        Category category = new Category("Smart Phones");

        Item iphone6 = new Item(category, "iphone6", "All new iphone6 with 5MP camera", 50L);
        Item iphone6s = new Item(category, "iphone6s", "All new iphone6s with 70MP camera", 75L);
        Item iphone8 = new Item(category, "iphone8", "All new iphone8 with 10MP camera", 100L);
        Item iphoneX = new Item(category, "iphoneX", "All new iphoneX with 20MP camera", 200L);

        List<Item> items = new ArrayList<>(Arrays.asList(iphone6, iphone6s, iphone8, iphoneX));
        IntStream.range(1, 101).forEach(i -> {
            items.add(new Item(category, "phone " + i, "phone" + i, 50L * i));
        });
        category.setItems(items);

        List<Category> categoryList = IntStream.range(1, 11).mapToObj(i -> new Category("Category " + i)).collect(Collectors.toList());
        categoryList.add(category);

//        this.categoryRepository.saveAll(categoryList);
        parseCSV();
    }

    private void parseCSV() throws IOException, URISyntaxException {
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