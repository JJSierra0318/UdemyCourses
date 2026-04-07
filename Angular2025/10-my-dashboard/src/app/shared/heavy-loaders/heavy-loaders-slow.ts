import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  imports: [],
  template: `
    <h1>Hola Mundo</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeavyLoadersSlow {
  constructor() {
    const start = Date.now()
    while(Date.now() - start < 3000) {}
    console.log("cargado")
  }
}
