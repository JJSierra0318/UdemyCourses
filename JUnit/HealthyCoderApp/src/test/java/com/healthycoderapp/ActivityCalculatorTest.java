package com.healthycoderapp;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import static org.junit.jupiter.api.Assertions.*;

class ActivityCalculatorTest {

  @Test
  void should_ReturnBad_when_AvgBelow20() {
    // given
    int weeklyCardioMins = 40;
    int weeklyWorkouts = 1;
    // when
    String actual = ActivityCalculator.rateActivityLevel(weeklyCardioMins, weeklyWorkouts);
    // then
    assertEquals("bad", actual);
  }

  @Test
  void should_ReturnAverage_when_AvgBetween20And40() {
    // given
    int weeklyCardioMins = 40;
    int weeklyWorkouts = 3;
    // when
    String actual = ActivityCalculator.rateActivityLevel(weeklyCardioMins, weeklyWorkouts);
    // then
    assertEquals("average", actual);
  }

  @Test
  void should_ReturnGood_when_AvgAbove40() {
    // given
    int weeklyCardioMins = 40;
    int weeklyWorkouts = 7;
    // when
    String actual = ActivityCalculator.rateActivityLevel(weeklyCardioMins, weeklyWorkouts);
    // then
    assertEquals("good", actual);
  }

  @Test
  void should_ThrowException_when_InputBelowZero() {
    // given
    int weeklyCardioMins = -40;
    int weeklyWorkouts = 7;
    // when
    Executable executable = () -> ActivityCalculator.rateActivityLevel(weeklyCardioMins, weeklyWorkouts);
    // then
    assertThrows(RuntimeException.class, executable);
  }
}