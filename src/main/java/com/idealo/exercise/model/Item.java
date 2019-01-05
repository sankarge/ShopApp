package com.idealo.exercise.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@Entity
public class Item {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @NotNull
    private Category category;

    @NotNull
    private String title;

    private String text;

    @NotNull
    private BigDecimal price;

    public Item() {
    }

    public Item(Category category, String title, String text, long price) {
        this(category, title, text, BigDecimal.valueOf(price));
    }

    private Item(Category category, String title, String text, BigDecimal price) {
        this.category = category;
        this.title = title;
        this.text = text;
        this.price = price;
    }
}