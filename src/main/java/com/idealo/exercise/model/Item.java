package com.idealo.exercise.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

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
    private Money price;

    public Item() {
    }

    public Item(Category category, String title, String text, Money price) {
        this.category = category;
        this.title = title;
        this.text = text;
        this.price = price;
    }
}