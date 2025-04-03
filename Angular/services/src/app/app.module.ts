import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountsService } from './accounts.service';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  // by providing a service in app module, all components and services will be able to use this service
  // if it is provided in appcomponent, it will be available in all components, but no in services
  // a better option is to add @Injectable({providedIn: 'root'}) decorator to the service
  providers: [AccountsService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
