import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from '@shared/side-menu/side-menu';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SideMenu],
  templateUrl: './dashboard.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Dashboard { }
