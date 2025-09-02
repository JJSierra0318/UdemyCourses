import { Component, inject, signal } from "@angular/core";
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add";
import { DragonballService } from "../../services/dragonball.service";

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  templateUrl: './dragonball-super-page.html',
  selector: 'app-dragonball-super',
  imports: [CharacterListComponent, CharacterAddComponent]
})
export class DragonballSuperPage {

  public dragonballService = inject(DragonballService)

  /* characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 }
  ]); */

  /* addCharacter(newCharacter: Character) {
    this.characters.update(list => [...list, newCharacter]);
  } */

}