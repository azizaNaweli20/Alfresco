import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core'; // Import de APP_INITIALIZER
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular'; // Import de KeycloakAngularModule et KeycloakService

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeKeycloak } from '../keycloak.config';


import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,

 SidebarComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule, 
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


