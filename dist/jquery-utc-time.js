(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UtcTime"] = factory();
	else
		root["UtcTime"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
        if (interval > 1) {
            if (settings.format) {
                return date.Format(settings.format);
            }
            return date.toLocaleDateString();;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + settings.daysAgo;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + settings.hoursAgo;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
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

/* harmony default export */ __webpack_exports__["default"] = (UtcTime);

/***/ })
/******/ ])["default"];
});