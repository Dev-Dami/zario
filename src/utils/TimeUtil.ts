export class TimeUtil {
  static format(date: Date, format: string): string {
    // Handle special format strings
    if (format === "ISO") {
      return date.toISOString();
    }
    if (format === "UTC") {
      return date.toUTCString();
    }
    if (format === "LOCAL") {
      return date.toLocaleString();
    }

    // Cache date parts to avoid repeated calls
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    // Preallocate parts to reduce concat cost
    const parts: string[] = [];
    let i = 0;
    let last = 0;

    while (i < format.length) {
      if (
        format[i] === "Y" &&
        i + 3 < format.length &&
        format.slice(i, i + 4) === "YYYY"
      ) {
        parts.push(format.substring(last, i));
        parts.push(year.toString().padStart(4, "0"));
        i += 4;
        last = i;
      } else if (
        format[i] === "M" &&
        i + 1 < format.length &&
        format.slice(i, i + 2) === "MM"
      ) {
        parts.push(format.substring(last, i));
        parts.push(month.toString().padStart(2, "0"));
        i += 2;
        last = i;
      } else if (
        format[i] === "D" &&
        i + 1 < format.length &&
        format.slice(i, i + 2) === "DD"
      ) {
        parts.push(format.substring(last, i));
        parts.push(day.toString().padStart(2, "0"));
        i += 2;
        last = i;
      } else if (
        format[i] === "H" &&
        i + 1 < format.length &&
        format.slice(i, i + 2) === "HH"
      ) {
        parts.push(format.substring(last, i));
        parts.push(hours.toString().padStart(2, "0"));
        i += 2;
        last = i;
      } else if (
        format[i] === "m" &&
        i + 1 < format.length &&
        format.slice(i, i + 2) === "mm"
      ) {
        parts.push(format.substring(last, i));
        parts.push(minutes.toString().padStart(2, "0"));
        i += 2;
        last = i;
      } else if (
        format[i] === "s" &&
        i + 1 < format.length &&
        format.slice(i, i + 2) === "ss"
      ) {
        parts.push(format.substring(last, i));
        parts.push(seconds.toString().padStart(2, "0"));
        i += 2;
        last = i;
      } else if (
        format[i] === "S" &&
        i + 2 < format.length &&
        format.slice(i, i + 3) === "SSS"
      ) {
        parts.push(format.substring(last, i));
        parts.push(milliseconds.toString().padStart(3, "0"));
        i += 3;
        last = i;
      } else {
        i++;
      }
    }

    parts.push(format.substring(last));

    return parts.join("");
  }
}
