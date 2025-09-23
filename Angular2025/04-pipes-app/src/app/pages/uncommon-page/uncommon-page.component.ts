import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/navbar/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Luis',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canadá'
}

const client2 = {
  name: 'Carolina',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canadá'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {

  // i18n Select
  client = signal(client1)

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2)
      return
    }
    this.client.set(client1)
  }

  //i18n plural
  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Melissa',
    'Carlos',
  ])

  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    other: 'tenemos # clientes esperando',
  })

  deleteClient() {
    this.clients.update( prev => prev.slice(1) )
  }

  //keyValue pipe
  profile = {
    name: 'Sierra',
    age: 22,
    address: 'Ottawa, Canadá'
  }

  // Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa.')
    }, 3000)
  })

  myObservableTimer = interval(2000).pipe(
    map((value) => value + 1),
  )
}
