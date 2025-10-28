# jQuery-UTC-time

A jquery plugin which converts UTC time to local time easily.

[![npm](https://img.shields.io/npm/v/jquery-utc-time.svg?style=flat)](https://www.npmjs.com/package/jquery-utc-time)
[![ManHours](https://manhours.aiursoft.cn/r/gitlab.aiursoft.com/anduin/jQuery-UTC-time.svg)](https://gitlab.aiursoft.com/anduin/jQuery-UTC-time/-/commits/master?ref_type=heads)

## How to install

### Download from NPM

```bash
npm install jquery-utc-time
```

And add your reference:

```html
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/jquery-utc-time/dist/jquery-utc-time.min.js"></script>
```

Or using es6:

```javascript
import UtcTime from 'jquery-utc-time';
```

### Use via CDN

Add your reference:

```html
<script src="https://ui.cdn.aiursoft.com/node_modules/jquery-utc-time/dist/jquery-utc-time.min.js"></script>
```

## How to use

Create an element.

```html
<p>

</p>
```

And change it like this.

```html
<p data-utc-time="9/12/2018 10:12:24 AM"><!-- In your tag the time shall be an UTC time -->
  
</p>
```

Add init jquery-utc-time

```html
<script>
    new UtcTime({ });
</script>
```

And open it now! The time will be converted to local time.

## API

```javascript
    // Init with loop
    new UtcTime({
        // We will try to select elements using the attr value. Default value is 'data-utc-time'.
        attr: 'data-utc-time',

        // We the given time is later than now, we will replace the value to its local time using the format. If format is not specified, we will just convert it to local string.
        format: 'yyyy年 MM月 dd日 hh:mm:ss',

        // Localization options. Default is ' days ago'
        daysAgo: '天前',

        // Localization options. Default is ' hours ago'
        hoursAgo: '小时前',

        // Localization options. Default is ' mintes ago'
        minutesAgo: '分钟前',

        // Localization options. Default is ' seconds ago'
        secondsAgo: '秒前',

        // Always display time and date not `some time` ago.
        disableAgo: false,

        // After the content is replaced.
        onSet: function(element) { },

        // Disable auto update the value by seconds.
        disableAutoUpdate: false
    });
```

For example, to init bootstrap tooltip:

```javascript
new UtcTime({
    onSet: function(element) {
        $(element).tooltip();
    }
});
```
