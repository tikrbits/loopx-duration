const DurationRegex = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([a-zµμ]*)/gi;

export type DurationUnits = keyof typeof duration;

/**
 * convert `str` to ms
 *
 * @param {String} str
 * @param {String} format
 * @return {Number}
 */
export function duration(str = '', format: DurationUnits = 'ms'): number {
  let result: number | undefined;
  // ignore commas
  str = str.replace(/(\d),(\d)/g, '$1$2');
  str.replace(DurationRegex, (_: string, n: string, units: DurationUnits) => {
    const numUnits =
      duration[units] ??
      duration[<DurationUnits>units.toLowerCase().replace(/s$/, '')];
    if (numUnits) result = (result ?? 0) + parseFloat(n) * numUnits;
    return '';
  });

  return result ? result / duration[format] : 0;
}

/**
 * conversion ratios
 */
export namespace duration {
  export const nanosecond = 1 / 1e6;
  export const ns = nanosecond;

  export const microsecond = 1 / 1e3;
  export const µs = microsecond;
  export const μs = microsecond;
  export const us = microsecond;

  export const millisecond = 1;
  export const ms = millisecond;

  export const second = millisecond * 1000;
  export const sec = second;
  export const s = second;

  export const minute = second * 60;
  export const min = minute;
  export const m = minute;

  export const hour = minute * 60;
  export const hr = hour;
  export const h = hour;

  export const day = hour * 24;
  export const d = day;

  export const week = day * 7;
  export const wk = week;
  export const w = week;

  export const month = day * (365.25 / 12);
  export const b = month;

  export const year = day * 365.25;
  export const yr = year;
  export const y = year;
}
