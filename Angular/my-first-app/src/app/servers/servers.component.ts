import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  //it is also possible to select by attribute
  //selector: '[app-server]'
  //or by class
  //selector: '.app-server'
  //also possible to define inline templates
  templateUrl: './servers.component.html',
  /* template: `
  <app-server></app-server>
  <app-server></app-server>`, */
  styleUrl: './servers.component.css'
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Testserver';
  serverCreated = false;
  servers = ["TestServer", "SierraServer"];

  //method executed when the component is created
  constructor() {
    setTimeout(() => this.allowNewServer = true, 2000);
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: any) {
    this.serverName = event.target.value;
  }
}
