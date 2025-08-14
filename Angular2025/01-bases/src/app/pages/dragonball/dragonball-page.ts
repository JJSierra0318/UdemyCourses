import { Component, signal } from "@angular/core";

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  templateUrl: './dragonball-page.html',
  selector: 'app-dragonball'
})
export class DragonballPage {
  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001 },
    {id: 2, name: 'Vegeta', power: 8000 },
    {id: 3, name: 'Piccolo', power: 3000 }
  ]);
}