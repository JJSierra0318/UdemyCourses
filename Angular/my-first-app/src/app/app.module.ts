import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import FormsModule to use ngModel
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
//import server component
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent
  ],
  imports: [
    BrowserModule,
    //add FormsModule to app module
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
