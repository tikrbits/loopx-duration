import {expect} from '@loopback/testlab';
import {duration} from '..';

const {ns, h, b, s, ms, d, y, m} = duration;

describe('duration', function () {
  it('ms, millisecond, milliseconds', () => {
    expect(duration('100ms')).equal(100);
    expect(duration('10millisecond')).equal(10);
    expect(duration('20 milliseconds')).equal(20);
  });
  it('s, sec, secs, second, seconds', () => {
    expect(duration('2s')).equal(2000);
    expect(duration('.5sec')).equal(500);
    expect(duration('+0. secs')).equal(0);
    expect(duration('-.2 second')).equal(-200);
    expect(duration('+1e-2seconds')).equal(10);
  });
  it('m, min, mins, minute, minutes', () => {
    expect(duration('.25m')).equal(15000);
    expect(duration('1min')).equal(60000);
    expect(duration('1 mins')).equal(60000);
    expect(duration('1 minute')).equal(60000);
    expect(duration('10 minutes')).equal(600000);
  });
  it('h, hr, hrs, hour, hours', () => {
    expect(duration('.5h')).equal(1800000);
    expect(duration('.5hr')).equal(1800000);
    expect(duration('.5hrs')).equal(1800000);
    expect(duration('.5hour')).equal(1800000);
    expect(duration('.5hours')).equal(1800000);
  });
  it('d, day, days', () => {
    expect(duration('1d')).equal(24 * 60 * 60 * 1000);
    expect(duration('1day')).equal(24 * 60 * 60 * 1000);
    expect(duration('1days')).equal(24 * 60 * 60 * 1000);
  });
  it('w, wk, wks, week, weeks', () => {
    expect(duration('1w')).equal(24 * 60 * 60 * 7 * 1000);
    expect(duration('1wk')).equal(24 * 60 * 60 * 7 * 1000);
    expect(duration('1wks')).equal(24 * 60 * 60 * 7 * 1000);
    expect(duration('1week')).equal(24 * 60 * 60 * 7 * 1000);
    expect(duration('1weeks')).equal(24 * 60 * 60 * 7 * 1000);
  });
  it('b, month, months', () => {
    expect(duration('1b')).equal((24 * 60 * 60 * 1000 * 365.25) / 12);
    expect(duration('1month')).equal((24 * 60 * 60 * 1000 * 365.25) / 12);
    expect(duration('1months')).equal((24 * 60 * 60 * 1000 * 365.25) / 12);
  });
  it('y, yr, yrs, year, years', () => {
    expect(duration('1y')).equal(24 * 60 * 60 * 1000 * 365.25);
    expect(duration('1yr')).equal(24 * 60 * 60 * 1000 * 365.25);
    expect(duration('1yrs')).equal(24 * 60 * 60 * 1000 * 365.25);
    expect(duration('1year')).equal(24 * 60 * 60 * 1000 * 365.25);
    expect(duration('1years')).equal(24 * 60 * 60 * 1000 * 365.25);
  });

  it('μs, ns', () => {
    expect(duration('1ns')).equal(1 / 1e6);
    expect(duration('1µs')).equal(1 / 1000);
    expect(duration('1μs')).equal(1 / 1000);
    expect(duration('1us')).equal(1 / 1000);
  });

  it('combined', () => {
    expect(duration('1hr 20mins')).equal(1 * h + 20 * m);
    expect(duration('1 hr 20 mins')).equal(1 * h + 20 * m);
    expect(duration('27,681 ns')).equal(27681 * ns);
    expect(duration('running length: 1hour:20mins')).equal(1 * h + 20 * m);
    expect(duration('2hr -40mins')).equal(1 * h + 20 * m);
    expect(duration('2e3s')).equal(2000 * s);
  });

  it('edge cases', () => {
    expect(duration('1y.2b.5days.12hours.34sec.20ms')).equal(
      1 * y + 0.2 * b + 0.5 * d + 0.12 * h + 0.34 * s + 0.2 * ms,
    );
    expect(duration('-1y.2b.5days 12hours,34sec,20ms')).equal(
      -1 * y + 0.2 * b + 0.5 * d + 12 * h + 34 * s + 20 * ms,
    );
  });

  it('invalid', () => {
    expect(duration('abc')).equal(0);
    expect(duration()).equal(0);
    expect(duration('I have 2 mangoes and 5 apples')).equal(0);
  });

  it('format', () => {
    expect(duration('1hr 20mins', 'm')).equal(
      duration('1hr 20mins') / 1000 / 60,
    );
  });
});
