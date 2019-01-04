package com.idealo.exercise.controller;

import com.idealo.exercise.repository.CategoryRepository;
import com.idealo.exercise.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePageController {


    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ItemRepository itemRepository;

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}