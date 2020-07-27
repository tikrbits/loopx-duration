# @tib/duration

[![Build](https://gitr.net/tibjs/duration/badges/master/pipeline.svg)](https://gitr.net/tibjs/duration)
[![Coverage](https://gitr.net/tibjs/duration/badges/master/coverage.svg)](https://gitr.net/tibjs/duration)

> convert a human readable duration to ms

## Installation

`npm install @tib/duration`

then in your app:

```js
import {duration} from '@tib/duration';
```

or CommonJS:

```js
const {duration} = require('@tib/duration');
```

## API

### duration(str, format='ms')

convert `str` to ms

```js
const ns = duration('1ns'); // => 1 / 1e6
const μs = duration('1μs'); // => 1 / 1000
const ms = duration('1ms'); // => 1
const s = duration('1s'); // => ms * 1000
const m = duration('1m'); // => s * 60
const h = duration('1h'); // => m * 60
const d = duration('1d'); // => h * 24
const w = duration('1w'); // => d * 7
const y = duration('1y'); // => d * 365.25
```

It can also handle basic compound expressions

```js
duration('1hr 20mins'); // => 1 * h + 20 * m
```

whitespace

```js
duration('1 hr 20 mins'); // => 1 * h + 20 * m
```

comma seperated numbers

```js
duration('27,681 ns'); // => 27681 * ns
```

And most other types of noise

```js
duration('running length: 1hour:20mins'); // => 1* h + 20 * m
```

You can even use negatives

```js
duration('2hr -40mins'); // => 1 * h + 20 * m
```

And exponents

```js
duration('2e3s'); // => 2000 * s
```

Available unit types are:

- nanoseconds (ns)
- microseconds (μs)
- milliseconds (ms)
- seconds (s, sec)
- minutes (m, min)
- hours (h, hr)
- days (d)
- weeks (w, wk)
- months
- years (y, yr)

and it's easy to add more

The output format can also be defined

```js
duration('1hr 20mins', 'm'); // => 80
```
