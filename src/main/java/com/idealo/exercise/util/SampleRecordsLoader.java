package com.idealo.exercise.util;

import com.idealo.exercise.model.Category;
import com.idealo.exercise.model.Item;
import com.idealo.exercise.model.Money;
import com.idealo.exercise.repository.CategoryRepository;
import com.idealo.exercise.repository.ItemRepository;
import org.joda.money.CurrencyUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

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
        Category category = new Category("SmartPhones");

        Item iphone6 = new Item(category, "iphone6", "All new iphone6 with 5MP camera", Money.of(CurrencyUnit.EUR, 50));
        Item iphone6s = new Item(category, "iphone6s", "All new iphone6s with 70MP camera", Money.of(CurrencyUnit.EUR, 75));
        Item iphone8 = new Item(category, "iphone8", "All new iphone8 with 10MP camera", Money.of(CurrencyUnit.EUR, 100));
        Item iphoneX = new Item(category, "iphoneX", "All new iphoneX with 20MP camera", Money.of(CurrencyUnit.EUR, 200));

        List<Item> items = Arrays.asList(iphone6, iphone6s, iphone8, iphoneX);
        category.setItems(items);
        this.categoryRepository.save(category);
//        this.itemRepository.saveAll(items);
    }
}