
import { Component ,NgZone} from '@angular/core';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: 'voice-listner',
  styleUrls: ['./style.css'],
  templateUrl: './template.html'
})
export class VoiceListner {

  public recognition: any;

  public intermediateResult: string = '';
  
  public finalResult: string = '';

  constructor(private _ngZone:NgZone) {

    const {webkitSpeechRecognition}: IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.cfinalResultontinuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-IN";
    this.finalResult=""
    let self = this;
    
    this.recognition.onstart = (event) => {
      this.finalResult="Started"

    };

    this.recognition.onerror = (event) => { };

    this.recognition.onend = (event) => {
      console.log(event,'---TEST---',self.finalResult);
    };

    let  handleEvent = (event:any)=>{

      var interimediate_transcript = "";
      var final_transcript = "";
      var isFinal = false;

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          isFinal = true;
          final_transcript += event.results[i][0].transcript;
        } else {
          isFinal = false;
          interimediate_transcript += event.results[i][0].transcript;
        }
      }

      if (isFinal && final_transcript) {
        console.info('final_transcript',final_transcript)
      } else if (interimediate_transcript) {
        console.info('interimediate_transcript',interimediate_transcript)
      };
      _ngZone.run(()=>{
          this.finalResult=final_transcript;
      });
     
  };

    this.recognition.onresult = (event:any)=>{  
      handleEvent.call(self,event);
    };
  }

  public start() {
    this.finalResult=""
    this.recognition.start();
  }

  public stop() {
    this.recognition.abort();
  }

  isChrome = function () {
    return /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
  };

  isSupportWebSpeechApi = function () {
    return (!("webkitSpeechRecognition" in window)) ? false : true;
  };

  isSupportWebVoiceDetectionApi = function () {
    return (("speechSynthesis" in window) && ("SpeechSynthesisEvent" in window) &&
      ("SpeechSynthesisUtterance" in window)) ? true : false;
  };

  isOnline = function () {
    if (window.navigator && window.navigator.onLine) {
      return true;
    } else {
      return false;
    }
  }

}