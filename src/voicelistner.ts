
import { Component ,NgZone,EventEmitter,Output} from '@angular/core';

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

  public micStatus:  number = 3;

  public toggleMic:boolean=false;

  @Output() onListeningVoice = new EventEmitter();

  constructor(private _ngZone:NgZone) {

    if(this.isChrome()&&this.isOnline()&&this.isSupportWebVoiceDetectionApi()){
      this.micStatus=1;
    }else{
      this.micStatus=3;
    }

    const {webkitSpeechRecognition}: IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.cfinalResultontinuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-IN";
    this.finalResult=""
    let self = this;
    
    this.recognition.onstart = (event) => {
    };

    this.recognition.onerror = (event) => { };

    this.recognition.onend = (event) => {
      console.log('@OnEnd.Test',event);
      _ngZone.run(()=>{
            this.micStatus=1;
            this.toggleMic =!this.toggleMic;
            this.stop();
            this.onListeningVoice.emit(this.finalResult);
      });
    };

    let  handleEvent = (event:any)=>{

      let interimediate_transcript = "";
      let final_transcript = "";
      let isFinal = false;
      let resultScript = ''

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
        console.info('final_transcript',final_transcript);
        resultScript = final_transcript;
      } else if (interimediate_transcript) {
        console.info('interimediate_transcript',interimediate_transcript);
        resultScript = interimediate_transcript;
      };
      _ngZone.run(()=>{
          this.finalResult=resultScript;
      });
     
  };

    this.recognition.onresult = (event:any)=>{  
      handleEvent.call(self,event);
    };
  }

  public toggleMicOnActivationClick=()=>{

    console.info('toggle mic',this.toggleMic,'mic status',this.micStatus);

    if(this.toggleMic&&(this.micStatus!==3)){

      this._ngZone.run(()=>{
        this.micStatus=1;
        this.stop();
        this.onListeningVoice.emit(this.finalResult);
      });
    }else if(!this.toggleMic&&(this.micStatus!==3)){
      this.micStatus=2;
      this.start();
    }

    this.toggleMic =!this.toggleMic;
  };

  public start() {
    this.finalResult=""
    this.recognition.start();
  }

  public stop() {
    this.recognition.abort();
  }

  public isChrome = function () {
    return /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
  };

  public isSupportWebSpeechApi = function () {
    return (!("webkitSpeechRecognition" in window)) ? false : true;
  };

 public isSupportWebVoiceDetectionApi = function () {
    return (("speechSynthesis" in window) && ("SpeechSynthesisEvent" in window) &&
      ("SpeechSynthesisUtterance" in window)) ? true : false;
  };

  public isOnline =  () => {
    if (window.navigator && window.navigator.onLine) {
      return true;
    } else {
      return false;
    }
  }

  public getStyleClass =()=>{

    if(this.micStatus==1){
      return 'microphone-voice-listner active';
    }else if(this.micStatus==2){
      return 'microphone-voice-listner in-use';
    }else{
      return 'microphone-voice-listner disable';
    }

  };

}