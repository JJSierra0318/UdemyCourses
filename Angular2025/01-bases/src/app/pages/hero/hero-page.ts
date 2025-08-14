import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";

@Component({
  templateUrl: './hero-page.html',
  imports: [UpperCasePipe]
})
export class HeroPage {
  name = signal('Iron Man');
  age = signal(45);

  // read-only signal, only updates if its dependencies (other signals) change
  heroDescription = computed(() => {
    const description = `${this.name()} - ${this.age()}`;
    return description;
  })

  capitalizedName = computed(() => this.name().toUpperCase());

  changeHero() {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  changeAge() {
    this.age.set(60);
  }

  resetForm() {
    this.name.set('Iron Man');
    this.age.set(45);
  }
}