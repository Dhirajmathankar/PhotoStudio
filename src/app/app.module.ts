import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContentSwitcherComponent } from './content-switcher/content-switcher.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- Add this
import { CommonModule } from '@angular/common';
import { Carousel3dComponent } from './carousel3d/carousel3d.component'; // <-- Add this if not already present


@NgModule({
  declarations: [
    AppComponent,
    ContentSwitcherComponent,
    Carousel3dComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // <-- Add here
    CommonModule // <-- Add here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
