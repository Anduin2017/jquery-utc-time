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
        var self = this;
        var loop = function () {
            self.initTime(defaultSettings, self);
            if (!defaultSettings.disableAutoUpdate) {
                setTimeout(loop, 1000);
            }
        };
        loop();
    }

    timeSince(date, settings) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 2592000);
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

    initTime(settings, self) {
        $('*[' + settings.attr + ']').each(function (t) {
            var timefield = $(this);
            var sourcevalue = timefield.attr(settings.attr);
            var timevalue = sourcevalue;
            if (!sourcevalue.endsWith(' UTC')) {
                timevalue = sourcevalue + ' UTC';
            }
            var date = new Date(timevalue);
            if (isNaN(date.getTime())) {
                if (!sourcevalue.endsWith('Z')) {
                    timevalue = sourcevalue + 'Z';
                } else {
                    timevalue = sourcevalue;
                }
                var date = new Date(timevalue);
            }
            var text = self.timeSince(date, settings);
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
            var o = {
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
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }
}

export { UtcTime }