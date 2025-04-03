import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CounterService {
  counter = 0;

  onStatusChange() {
    this.counter++;
    console.log('Status change operations count: ' + this.counter);
  }
}