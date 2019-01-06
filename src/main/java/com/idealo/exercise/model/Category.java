package com.idealo.exercise.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Collection;

@Data
@Entity
public class Category {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    @OneToMany(mappedBy = "category",  fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Collection<Item> items;

    public Category() {

    }

    public Category(String title) {
        this.title = title;
    }

    public void setItems(Collection<Item> items) {
        this.items = items;
    }

    public void addItem(Item item){
        this.items.add(item);
    }
}