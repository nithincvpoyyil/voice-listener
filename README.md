# ngx-voiceinput

This is a voice based input plugin for angular2+ framewrok. It was built for modern browsers using TypeScript, CSS3 and HTML5 and Angular >=4.0.0, and Google Chrome is the only browser which supports [web speech API](https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API).

### Installation

`npm install @ngxvoice/ngx-voicelistner` or `yarn add @voice/ngx-voicelistner`


### Usage


##### App module

```typescript
import { NgxVoiceListnerModule } from "@ngxvoice/ngx-voicelistner";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, NgxVoiceListnerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


##### Example component


```typescript
@Component({
  selector: 'example-component',
  styleUrls: [],
  providers: [],
  template: `<div class="container">
              <voice-listner-input [lang]='en-US' (onListeningVoice)="getTheSearchString($event)" ></voice-listner-input>
             </div>`
})
export class ExampleComponent {

  public voiceStringList: string[] = ['test'];

  constructor() {
  
  }

  public getTheSearchString(finalString: string) {
    console.log('new string - ', finalString);
    this.voiceStringList.push(finalString);
  }
}

```

##### Configuration for language

This library is using 'en-IN' as language config by default, you can chnage this is by adding `lang` input parameter as shown in the example below. For more information, please refer Web Speech API link in the above description.

#### Known issues: If you are facing installtion issues (Error code : EBADPLATFORM or fsevent related issues) [downgrade the npm](https://github.com/npm/npm/issues/8899) to 3.1.0 and try.

```shellscript
npm install -g npm@3.1.0
``` 

## Credits
`ngx-voiceinput` is based on [ngx-datatable](http://swimlane.github.io/ngx-datatable)'s seed project.

made with :heart:
