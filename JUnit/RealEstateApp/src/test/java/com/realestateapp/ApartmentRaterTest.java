package com.realestateapp;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ApartmentRaterTest {

  @Nested
  class RateApartmentTests {

    @ParameterizedTest
    @CsvSource({"72.0, 250000.0, 0", "48.0, 350000.0, 1", "30.0, 600000.0, 2"})
    void should_ReturnCorrectRating_When_CorrectApartment(double area, BigDecimal price, int rating) {
      Apartment apartment = new Apartment(area, price);
      int actual = ApartmentRater.rateApartment(apartment);
      assertEquals(rating, actual);
    }

    @Test
    void should_ReturnErrorValue_When_IncorrectApartment() {
      Apartment apartment = new Apartment(0.0, new BigDecimal("250000.0"));
      int actual = ApartmentRater.rateApartment(apartment);
      assertEquals(-1, actual);
    }
  }

  @Nested
  class CalculateAverageRatingTests {

    @Test
    void should_CalculateAverageRating_When_CorrectApartmentList() {
      List<Apartment> apartments = new ArrayList<>();
      apartments.add(new Apartment(72.0, new BigDecimal("250000.0")));
      apartments.add(new Apartment(48.0, new BigDecimal("350000.0")));
      apartments.add(new Apartment(30.0, new BigDecimal("600000.0")));
      double actual = ApartmentRater.calculateAverageRating(apartments);
      assertEquals(1.0, actual);
    }

    @Test
    void should_ThrowExceptionInCalculateAverageRating_When_EmptyApartmentList() {
      List<Apartment> apartments = new ArrayList<>();
      Executable executable = () -> ApartmentRater.calculateAverageRating(apartments);
      assertThrows(RuntimeException.class, executable);
    }
  }
}