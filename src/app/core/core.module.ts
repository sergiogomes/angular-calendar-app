import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent, LoadingComponent } from './components';

@NgModule({
  exports: [
    NavbarComponent,
    LoadingComponent
  ],
  declarations: [
    NavbarComponent,
    LoadingComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    LoadingComponent
  ]
})
export class CoreModule { }
