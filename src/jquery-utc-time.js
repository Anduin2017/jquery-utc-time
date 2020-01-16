(function ($) {

    var savedSettings = null;

    var timeSince = function (date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            if (savedSettings.format) {
                return date.Format(savedSettings.format);
            }
            return date.toLocaleDateString();;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            if (savedSettings.daysAgo) {
                return interval + savedSettings.daysAgo;
            }
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            if (savedSettings.hoursAgo) {
                return interval + savedSettings.hoursAgo;
            }
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            if (savedSettings.minutesAgo) {
                return interval + savedSettings.minutesAgo;
            }
            return interval + " minutes ago";
        }
        if (interval >= 0) {
            if (savedSettings.secondsAgo) {
                return Math.floor(seconds) + savedSettings.secondsAgo;
            }
            return Math.floor(seconds) + " seconds ago";
        } else {
            if (savedSettings.format) {
                return date.Format(savedSettings.format);
            }
            return date.toLocaleDateString();;
        }
    };

    var initTime = function () {
        if (!savedSettings.attr) {
            savedSettings.attr = 'data-utc-time'
        }
        $('*[' + savedSettings.attr + ']').each(function (t) {
            var timefield = $(this);
            var sourcevalue = timefield.attr(savedSettings.attr);
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
            var text = timeSince(date);
            if(savedSettings.disableAgo) {
                if (savedSettings.format) {
                    text = date.Format(savedSettings.format);
                } else {
                    text = date.toLocaleDateString();;
                }
            }
            timefield.html(text);
            if (timefield.tooltip && !savedSettings.disableHover) {
                timefield.attr('data-toggle', 'tooltip');
                timefield.attr('data-trigger', 'hover');
                timefield.attr('data-title', date.toLocaleString());
                timefield.tooltip();
            }
        });
    };

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

    $.fn.initUTCTime = function (settings) {
        if(settings == null || settings == undefined) {
            settings = { };
        }
        savedSettings = settings;

        var loop = function () {
            initTime();
            setTimeout(loop, 1000);
        };
        loop();
    }

    $.fn.initUTCTimeOnce = function () {
        initTime();
    }
}(jQuery))