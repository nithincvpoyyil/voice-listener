import { Component, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';

@Component({
  selector: 'app',
  styleUrls: [
    '../src/themes/material.scss',
    '../src/themes/dark.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  template: `
    <div>
      <nav>
        <h3>ngx-voicelistner <small>({{version}})</small></h3>
        <ul class="main-ul">
          <li>
            <h4>Documentation</h4>
            <ul>
              <li>
                <a href="#" target="_black">Online</a>
              </li>
              <li>
                <a href="#" target="_black">PDF</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <content>
        <voice-listner-input></voice-listner-input>
      </content>
    </div>
  `
})
export class AppComponent {

  get state() {
    return window.state;
  }

  set state(state) {
    window.state = state;
  }

  version: string = APP_VERSION;

  constructor(location: Location) {
    this.state = location.path(true);
  }

}
