import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/observable/fromEvent';

import {
  VoiceListnerInput
} from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [],
  declarations: [
    VoiceListnerInput
  ],
  exports: [
    VoiceListnerInput
  ]
})
export class NgxDatatableModule { }