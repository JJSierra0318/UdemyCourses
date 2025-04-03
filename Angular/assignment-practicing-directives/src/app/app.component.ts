import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
    .logs {
      color: white;
    }
  `]
})
export class AppComponent {
  displayText = true;
  clickCount = 0
  clicks = [];

  onClick() {
    this.displayText = !this.displayText;
    this.clickCount += 1;
    this.clicks.push(this.clickCount);
  }
}
