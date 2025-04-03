//component shoul be inside its own folder, and the files named componentName.component.extension
import { Component } from "@angular/core";

//angular component decorator
@Component({
    //the name of the html selector, usually named app-componentName
    selector: 'app-server',
    //pointer to the html file
    templateUrl: './server.component.html',
    //define style for class online
    styles: [`
        .online {
            color: white;
        }
    `]
})
//component is a class
export class ServerComponent {
    serverId = 10;
    serverStatus = 'offline';

    constructor() {
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline'
    }

    getColor() {
        return this.serverStatus === 'online' ? 'green' : 'red';
    }
}