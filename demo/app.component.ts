import { Component, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';

@Component({
  selector: 'app',
  styleUrls: [
    '../src/themes/material.scss',
    '../src/themes/dark.scss',
    './style.scss'
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
            </ul>
          </li>
        </ul>
      </nav>
      <content>
        <voice-listner-input [lang]='en-US' (onListeningVoice)="getTheSearchString($event)" ></voice-listner-input>
        <div class="voice-list-wrapper" id="list-1">
        <label for="list-1"> word list </label>
          <article >
            <span *ngFor="let item of voiceStringList" class="item">{{item}}</span>
          </article>
        </div>
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
  public voiceStringList: string[] = ['test'];

  constructor(location: Location) {
    this.state = location.path(true);
  }

  public getTheSearchString(finalString: string) {
    console.log('', finalString);
    this.voiceStringList.push(finalString);
  }
}
