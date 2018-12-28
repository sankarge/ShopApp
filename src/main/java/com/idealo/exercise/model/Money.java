package com.idealo.exercise.model;

import lombok.Data;
import org.joda.money.CurrencyUnit;

import javax.persistence.Embeddable;
import java.math.BigDecimal;

@Embeddable
@Data
public class Money {

    /**
     * ISO 4217 currency code.
     */
    private String currencyCode;

    private BigDecimal value;

    public Money() {
    }

    private Money(String currencyCode, BigDecimal value) {
        this.value = value;
        this.currencyCode = currencyCode;
    }

    public static Money of(CurrencyUnit currency, double amount) {
        return of(currency, BigDecimal.valueOf(amount));
    }

    private static Money of(CurrencyUnit currency, BigDecimal amount) {
        return new Money(currency.getCode(), amount);
    }
}
