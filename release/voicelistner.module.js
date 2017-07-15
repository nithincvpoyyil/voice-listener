"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
require("rxjs/add/observable/fromEvent");
var components_1 = require("./components");
var NgxVoiceListnerModule = (function () {
    function NgxVoiceListnerModule() {
    }
    NgxVoiceListnerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule
                    ],
                    providers: [],
                    declarations: [
                        components_1.VoiceListnerInput
                    ],
                    exports: [
                        components_1.VoiceListnerInput
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxVoiceListnerModule.ctorParameters = function () { return []; };
    return NgxVoiceListnerModule;
}());
exports.NgxVoiceListnerModule = NgxVoiceListnerModule;
//# sourceMappingURL=voicelistner.module.js.map