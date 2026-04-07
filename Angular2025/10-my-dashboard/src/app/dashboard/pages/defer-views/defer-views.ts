import { Component } from '@angular/core';
import { HeavyLoadersSlow } from '@shared/heavy-loaders/heavy-loaders-slow';

@Component({
  selector: 'app-defer-views',
  imports: [HeavyLoadersSlow],
  templateUrl: './defer-views.html'
})
export default class DeferViews { }
