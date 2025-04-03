import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css'
})
export class GameControlComponent {
  @Output() intervalEvent = new EventEmitter<number>();
  number = 0;
  interval;

  startInterval() {
    this.interval = setInterval(() => {
      this.intervalEvent.emit(this.number + 1);
      this.number++;
    }, 1000);
  }

  stopInterval() {
    clearInterval(this.interval);
  }
}
