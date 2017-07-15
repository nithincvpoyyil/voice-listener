"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var VoiceListnerInput = (function () {
    function VoiceListnerInput(zone) {
        var _this = this;
        this.zone = zone;
        this.intermediateResult = '';
        this.finalResult = '';
        this.micStatus = 3;
        this.toggleMic = false;
        this.isAPIAvailableFlag = true;
        this.onListeningVoice = new core_1.EventEmitter();
        this.isChrome = function () {
            return /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
        };
        this.isSupportWebSpeechApi = function () {
            return (!('webkitSpeechRecognition' in window)) ? false : true;
        };
        this.isSupportWebVoiceDetectionApi = function () {
            return (('speechSynthesis' in window) && ('SpeechSynthesisEvent' in window) &&
                ('SpeechSynthesisUtterance' in window)) ? true : false;
        };
        this.isOnline = function () {
            if (window.navigator && window.navigator.onLine) {
                return true;
            }
            else {
                return false;
            }
        };
        this.getStyleClass = function () {
            if (_this.micStatus === 1) {
                return 'microphone-voice-listner active';
            }
            else if (_this.micStatus === 2) {
                return 'microphone-voice-listner in-use';
            }
            else {
                return 'microphone-voice-listner disable';
            }
        };
        if (this.isChrome() && this.isOnline() && this.isSupportWebVoiceDetectionApi()) {
            this.micStatus = 1;
            this.isAPIAvailableFlag = false;
        }
        else {
            this.micStatus = 3;
        }
        try {
            var webkitSpeechRecognition = window.webkitSpeechRecognition;
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-IN';
            this.finalResult = '';
            this.recognition.onstart = function (event) { };
            this.recognition.onerror = function (event) { };
            this.recognition.onend = function (event) {
                zone.run(function () {
                    _this.micStatus = 1;
                    _this.toggleMic = !_this.toggleMic;
                    _this.stop();
                    _this.onListeningVoice.emit(_this.finalResult);
                });
            };
            this.recognition.onresult = function (event) {
                _this.handleOnListening(event);
            };
        }
        catch (e) {
            this.isAPIAvailableFlag = true;
        }
    }
    VoiceListnerInput.prototype.handleOnListening = function (event) {
        var _this = this;
        var interimediateTranscript = '';
        var finalTranscript = '';
        var isFinal = false;
        var resultScript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                isFinal = true;
                finalTranscript += event.results[i][0].transcript;
            }
            else {
                isFinal = false;
                interimediateTranscript += event.results[i][0].transcript;
            }
        }
        if (isFinal && finalTranscript) {
            resultScript = finalTranscript;
        }
        else if (interimediateTranscript) {
            resultScript = interimediateTranscript;
        }
        this.zone.run(function () {
            _this.finalResult = resultScript;
        });
    };
    VoiceListnerInput.prototype.toggleMicOnActivationClick = function () {
        var _this = this;
        if (this.toggleMic && (this.micStatus !== 3)) {
            this.zone.run(function () {
                _this.micStatus = 1;
                _this.stop();
            });
        }
        else if (!this.toggleMic && (this.micStatus !== 3)) {
            this.micStatus = 2;
            this.start();
        }
        this.toggleMic = !this.toggleMic;
    };
    VoiceListnerInput.prototype.start = function () {
        this.finalResult = '';
        this.recognition.start();
    };
    VoiceListnerInput.prototype.stop = function () {
        this.recognition.abort();
    };
    VoiceListnerInput.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'voice-listner-input,[voiceListnerInput]',
                    styleUrls: ['./style.css'],
                    template: "\n            <div class=\"voice-listner-container\">\n              <input [(ngModel)]=\"finalResult\" type=\"text\"/>\n              <span class=\"indicator-container\" (click)=\"toggleMicOnActivationClick()\">\n\n                  <svg id=\"microphone\"\n                  class=\"microphone-voice-listner\"\n                  [ngClass]=\"getStyleClass()\"\n                  width=\"20\"\n                  height=\"20\"\n                  viewBox=\"0 0 16 16\">\n\n                <path class=\"mic-base\"\n                      d=\"M9,12.86 L9,14 L9.5,14 C10.15,14 10.69,14.42 10.9,15 L5.1,15 C5.31,14.42 5.85,14 6.5,14 L7,14 L7,12.86 C5.28,12.41 4,10.86 4,9 L4,7 L5,7 L5,9 C5,10.66 6.34,12 8,12 C9.66,12 11,10.66 11,9 L11,7 L12,7 L12,9 C12,10.86 10.72,12.41 9,12.86 L9,12.86 L9,12.86 Z\"/>\n                <path class=\"mic-top\"\n                      d=\"M8,11 C6.9,11 6,10.1 6,9 L6,3 C6,1.9 6.9,1 8,1 C9.1,1 10,1.9 10,3 L10,9 C10,10.1 9.1,11 8,11 L8,11 L8,11 Z\"/>\n\n              </svg>\n              </span>\n            </div>"
                },] },
    ];
    /** @nocollapse */
    VoiceListnerInput.ctorParameters = function () { return [
        { type: core_1.NgZone, },
    ]; };
    VoiceListnerInput.propDecorators = {
        'onListeningVoice': [{ type: core_1.Output },],
    };
    return VoiceListnerInput;
}());
exports.VoiceListnerInput = VoiceListnerInput;
//# sourceMappingURL=voicelistner.js.map