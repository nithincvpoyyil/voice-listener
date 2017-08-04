import { NgZone, EventEmitter } from '@angular/core';
export declare class VoiceListnerInput {
    private zone;
    recognition: any;
    intermediateResult: string;
    finalResult: string;
    micStatus: number;
    toggleMic: boolean;
    isAPIAvailableFlag: boolean;
    onListeningVoice: EventEmitter<{}>;
    lang: string;
    constructor(zone: NgZone);
    handleOnListening(event: any): void;
    toggleMicOnActivationClick(): void;
    start(): void;
    stop(): void;
    isChrome: () => boolean;
    isSupportWebSpeechApi: () => boolean;
    isSupportWebVoiceDetectionApi: () => boolean;
    isOnline: () => boolean;
    getStyleClass: () => "microphone-voice-listner active" | "microphone-voice-listner in-use" | "microphone-voice-listner disable";
}
