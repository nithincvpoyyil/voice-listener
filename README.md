# ngx-voiceinput

This is a voice based input plugin for angular2+ framewrok. It was built for modern browsers using TypeScript, CSS3 and HTML5 and Angular >=4.0.0, and Google Chrome is the only browser which supports [web speech API](https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API).

### Installation



### Usage



##### App module

```typescript
import { NgxVoiceListnerModule } from "@voice/ngx-voicelistner";

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


## Credits
`ngx-voiceinput` is based on [ngx-datatable](http://swimlane.github.io/ngx-datatable)'s seed project.

made with :heart: by nithin 
