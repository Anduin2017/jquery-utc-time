import $ from 'jquery';

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
            disableHover: false,
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
        $('*[' + settings.attr + ']').each(function (t) {
            let timefield = $(this);
            let sourcevalue = timefield.attr(settings.attr);
            let date = self.getDate(sourcevalue);
            let text = self.timeSince(date, settings);
            if (settings.disableAgo) {
                if (settings.format) {
                    text = date.Format(settings.format);
                } else {
                    text = date.toLocaleDateString();;
                }
            }
            timefield.html(text);
            if (timefield.tooltip && !settings.disableHover) {
                timefield.attr('data-toggle', 'tooltip');
                timefield.attr('data-trigger', 'hover');
                timefield.attr('data-title', date.toLocaleString());
                timefield.tooltip();
            }
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

export { UtcTime }