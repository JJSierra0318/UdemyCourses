import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Title } from '@shared/title/title';

@Component({
  selector: 'app-change-detection',
  imports: [Title, JsonPipe],
  template: `
  <app-title [title]="currentFramework()" />
  <pre> {{ frameworkSignal() | json }} </pre>
  <pre> {{ frameworkProperty | json }} </pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChangeDetection {

  currentFramework = computed(
    () => `Change detection - ${this.frameworkSignal().name}`
  )

  frameworkSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  })

  frameworkProperty = {
    name: 'Angular',
    releaseDate: 2016,
  }

  constructor() {
    setTimeout(() => {
      //this.frameworkProperty.name = 'React';
      this.frameworkSignal.update(value => ({
        ...value,
        name: 'React'
      }))
      console.log('Hecho');
    }, 3000)
  }
}
