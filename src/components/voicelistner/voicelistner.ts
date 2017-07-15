import { Component, NgZone, EventEmitter, Output, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: 'voice-listner-input,[voiceListnerInput]',
  styleUrls: ['./style.scss'],
  template: `
            <div class="voice-listner-container">
              <input [(ngModel)]="finalResult" type="text"/>
              <span class="indicator-container" (click)="toggleMicOnActivationClick()">

                  <svg id="microphone"
                  class="microphone-voice-listner"
                  [ngClass]="getStyleClass()"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16">

                <path class="mic-base"
                      d="M9,12.86 L9,14 L9.5,14 C10.15,14 10.69,14.42 10.9,15 L5.1,15 C5.31,14.42 5.85,14 6.5,14 L7,14 L7,12.86 C5.28,12.41 4,10.86 4,9 L4,7 L5,7 L5,9 C5,10.66 6.34,12 8,12 C9.66,12 11,10.66 11,9 L11,7 L12,7 L12,9 C12,10.86 10.72,12.41 9,12.86 L9,12.86 L9,12.86 Z"/>
                <path class="mic-top"
                      d="M8,11 C6.9,11 6,10.1 6,9 L6,3 C6,1.9 6.9,1 8,1 C9.1,1 10,1.9 10,3 L10,9 C10,10.1 9.1,11 8,11 L8,11 L8,11 Z"/>

              </svg>
              </span>
            </div>`
})
export class VoiceListnerInput {

  public recognition: any;

  public intermediateResult: string = '';

  public finalResult: string = '';

  public micStatus: number = 3;

  public toggleMic: boolean = false;

  public isAPIAvailableFlag = true;

  @Output() onListeningVoice = new EventEmitter();

  constructor(private zone: NgZone) {

    if (this.isChrome() && this.isOnline() && this.isSupportWebVoiceDetectionApi()) {
      this.micStatus = 1;
      this.isAPIAvailableFlag = false;
    } else {
      this.micStatus = 3;
    }
    try {
      const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN';
      this.finalResult = '';

      this.recognition.onstart = (event: any) => { };
      this.recognition.onerror = (event: any) => { };
      this.recognition.onend = (event: any) => {
        zone.run(() => {
          this.micStatus = 1;
          this.toggleMic = !this.toggleMic;
          this.stop();
          this.onListeningVoice.emit(this.finalResult);
        });
      };

      this.recognition.onresult = (event: any) => {
        this.handleOnListening(event);
      };

    } catch (e) {
      this.isAPIAvailableFlag = true;
    }

  }

  public handleOnListening(event: any) {

    let interimediateTranscript: string = '';
    let finalTranscript: string = '';
    let isFinal = false;
    let resultScript: string = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        isFinal = true;
        finalTranscript += event.results[i][0].transcript;
      } else {
        isFinal = false;
        interimediateTranscript += event.results[i][0].transcript;
      }
    }

    if (isFinal && finalTranscript) {
      resultScript = finalTranscript;
    } else if (interimediateTranscript) {
      resultScript = interimediateTranscript;
    }
    this.zone.run(() => {
      this.finalResult = resultScript;
    });
  }

  public toggleMicOnActivationClick() {

    if (this.toggleMic && (this.micStatus !== 3)) {

      this.zone.run(() => {
        this.micStatus = 1;
        this.stop();
      });
    } else if (!this.toggleMic && (this.micStatus !== 3)) {
      this.micStatus = 2;
      this.start();
    }

    this.toggleMic = !this.toggleMic;
  }

  public start() {
    this.finalResult = '';
    this.recognition.start();
  }

  public stop() {
    this.recognition.abort();
  }

  public isChrome =  () => {
    return /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
  }

  public isSupportWebSpeechApi =  () => {
    return (!('webkitSpeechRecognition' in window)) ? false : true;
  }

  public isSupportWebVoiceDetectionApi =  () => {
    return (('speechSynthesis' in window) && ('SpeechSynthesisEvent' in window) &&
      ('SpeechSynthesisUtterance' in window)) ? true : false;
  }

  public isOnline = () => {
    if (window.navigator && window.navigator.onLine) {
      return true;
    } else {
      return false;
    }
  }

  public getStyleClass = () => {

    if (this.micStatus === 1) {
      return 'microphone-voice-listner active';
    } else if (this.micStatus === 2) {
      return 'microphone-voice-listner in-use';
    } else {
      return 'microphone-voice-listner disable';
    }

  }
}
