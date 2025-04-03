package conditionals

import java.util.*

fun main() {
/*
    var age: Int = 18
    if (age < 18){
        println("You cannot register.")
    } else if (age == 18) {
        println("You're good to go! (Barely)")
    } else {
        println("you're good to go!")
    }

    // Switch case like
    val mode: Int = 2
    // When and if can be expressions
    val result = when (mode) {
        1 -> "one"
        2 -> {
            "two"
        }
        else -> "any other number"
    }

    println(result)

    val x = 10
    when(x) {
        5 -> println("x is 5")
        3*2 -> println("x is 3*2")
        "Hey there".length -> println("x is length of string")
        in 1..10 -> println("x is between 1 and 10")
        !in 11..15 -> println("x is not 1")

 */

    //Challenge
    val random = Random().nextInt(50) + 1
    when (random) {
        in 1..10 -> println("1 to 10, value: $random")
        in 11..20 -> println("11 to 20, value: $random")
        in 21..30 -> println("21 to 30, value: $random")
        in 31..40 -> println("31 to 40, value: $random")
        else -> println("41 to 50, value: $random")
    }
}