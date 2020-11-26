import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { CalendarComponent, GridComponent, InfoComponent } from './calendar';
import { HomeComponent } from './home';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HomeComponent,
    GridComponent,
    InfoComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
