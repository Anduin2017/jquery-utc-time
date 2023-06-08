(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UtcTime"] = factory();
	else
		root["UtcTime"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class UtcTime {

    constructor(settings) {
        let defaultSettings = {
            attr: 'data-utc-time',
            format: '',
            daysAgo: ' days ago',
            hoursAgo: ' hours ago',
            minutesAgo: ' minutes ago',
            secondsAgo: ' seconds ago',
            disableAgo: false,
            onSet: function (obj) { },
            disableAutoUpdate: false
        };
        Object.assign(defaultSettings, settings);
        this.initFormat();
        let self = this;
        let loop = function () {
            self.initTime(defaultSettings, self);
            if (!defaultSettings.disableAutoUpdate) {
                setTimeout(loop, 1000);
            }
        };
        loop();
    }

    timeSince(date, settings) {
        let seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            if (settings.format) {
                return date.Format(settings.format);
            }
            return date.toLocaleDateString();;
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + settings.daysAgo;
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + settings.hoursAgo;
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + settings.minutesAgo;
        }
        if (interval >= 0) {
            return Math.floor(seconds) + settings.secondsAgo;
        } else {
            if (settings.format) {
                return date.Format(settings.format);
            }
            return date.toLocaleDateString();;
        }
    };

    getDate(inputString) {
        if (inputString.endsWith(' UTC') || inputString.endsWith('Z')) {
            return new Date(inputString);
        }
        if (!inputString.endsWith(' UTC')) {
            let timevalue = inputString + ' UTC';
            let date = new Date(timevalue);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        if (!inputString.endsWith('Z')) {
            let timevalue = inputString + 'Z';
            let date = new Date(timevalue);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        console.warn(`jquery-utc-time: Input string ${inputString} can not be converted to UTC time and try to parse as typical date string.`);
        return new Date(inputString);
    }

    initTime(settings, self) {
        document.querySelectorAll('*[' + settings.attr + ']').forEach(timefield => {
            let sourcevalue = timefield.getAttribute(settings.attr);
            let date = self.getDate(sourcevalue);
            let text = self.timeSince(date, settings);
            if (settings.disableAgo) {
                if (settings.format) {
                    text = date.Format(settings.format);
                } else {
                    text = date.toLocaleDateString();;
                }
            }
            timefield.innerHTML = text;
            timefield.setAttribute('data-toggle', 'tooltip');
            timefield.setAttribute('data-trigger', 'hover');
            timefield.setAttribute('data-title', date.toLocaleString());
            settings.onSet(timefield);
        });
    };

    initFormat() {
        Date.prototype.Format = function (fmt) {
            const o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UtcTime);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});