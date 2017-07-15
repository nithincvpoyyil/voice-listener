import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxVoiceListnerModule } from '../src';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, NgxVoiceListnerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
