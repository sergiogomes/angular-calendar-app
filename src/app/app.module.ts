import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
    AppRoutingModule,
    ReactiveFormsModule,
    // Compiler,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
