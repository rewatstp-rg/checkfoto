import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'p';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })
    : '';
}

export function isBetween(inputDate: Date | string | number, startDate: Date, endDate: Date) {
  const date = new Date(inputDate);

  const results =
    new Date(date.toDateString()) >= new Date(startDate.toDateString()) &&
    new Date(date.toDateString()) <= new Date(endDate.toDateString());

  return results;
}

export function isBetweenDateTime(
  inputDate: Date | string | number,
  startDate: Date | string | number,
  endDate: Date | string | number
): boolean {
  const date = new Date(inputDate);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return date >= start && date <= end;
}

export function isAfter(startDate: Date | null, endDate: Date | null) {
  const results =
    startDate && endDate ? new Date(startDate).getTime() > new Date(endDate).getTime() : false;

  return results;
}

export const FORMAT_DATE = {
  "SHORT": "SHORT",
  "SHORT_TIME": "SHORT-TIME",
  "LONG": "LONG",
  "LONG_TIME": "LONG-TIME",
}

function setTimeToString(value: any) {
  const zeroString = '0';
  let newTime;
  if (value < 10) {
    newTime = zeroString.concat(value);
  } else {
    newTime = value;
  }
  return newTime
}

export function dateThFormat(date: any, type: string) {

  let dateOutput: any;

  if (date) {
    const words = date.split('-');
    if (words[2] < 10 && words[2].length === 1) {
      words[2] = `0${words[2]}`
    }

    date = `${words[0]}-${words[1]}-${words[2]}`;
  }

  if (date) {


    const inputDate = new Date(date);

    // let dataObj: any;

    const dataObj = [
      inputDate.getDay(),
      inputDate.getDate(),
      inputDate.getMonth(),
      inputDate.getFullYear(),
      inputDate.getHours(),
      inputDate.getMinutes(),
      inputDate.getSeconds()
    ];

    const shortThaiMonth = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];

    const longThaiMonth = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    switch (type) {
      case FORMAT_DATE.SHORT:
        dateOutput = `${dataObj[1]} ${shortThaiMonth[dataObj[2]]}  ${(dataObj[3] + 543)}`;
        break;
      case FORMAT_DATE.SHORT_TIME:
        dateOutput = `${dataObj[1]} ${shortThaiMonth[dataObj[2]]} ${(dataObj[3] + 543)} ${dataObj[4]} : ${dataObj[5]}`;
        break;
      case FORMAT_DATE.LONG:
        dateOutput = `${dataObj[1]} ${longThaiMonth[dataObj[2]]}  ${(dataObj[3] + 543)}`;
        break;
      case FORMAT_DATE.LONG_TIME:
        dateOutput = `${dataObj[1]} ${longThaiMonth[dataObj[2]]} ${(dataObj[3] + 543)} เวลา ${setTimeToString(dataObj[4])}:${setTimeToString(dataObj[5])}:${setTimeToString(dataObj[6])}`;
        break;
      default:
        dateOutput = `${dataObj[1]} ${longThaiMonth[dataObj[2]]} ${(dataObj[3] + 543)}`;
        break;
    }
  }

  return dateOutput;

}

export function dateEnFormat(date: any, type: string) {

  let dateOutput: any;

  if (date) {
    const words = date.split('-');
    if (words[2] < 10 && words[2].length === 1) {
      words[2] = `0${words[2]}`
    }

    date = `${words[0]}-${words[1]}-${words[2]}`;
  }

  if (date) {

    const inputDate = new Date(date);
    if (inputDate) {

      const dataObj = [
        inputDate.getDay(),
        inputDate.getDate(),
        inputDate.getMonth(),
        inputDate.getFullYear(),
        inputDate.getHours(),
        inputDate.getMinutes(),
        inputDate.getSeconds(),
        inputDate.getMilliseconds()
      ];

      const shortEnMonth = [
        'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
        'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
      ];

      const longEnMonth = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      switch (type) {
        case FORMAT_DATE.SHORT:
          dateOutput = `${dataObj[1]} ${shortEnMonth[dataObj[2]]} ${(dataObj[3])}`;
          break;
        case FORMAT_DATE.SHORT_TIME:
          dateOutput = `${dataObj[1]} ${shortEnMonth[dataObj[2]]} ${(dataObj[3])} ${dataObj[4]} : ${dataObj[5]}`;
          break;
        case FORMAT_DATE.LONG:
          dateOutput = `${dataObj[1]} ${longEnMonth[dataObj[2]]} ${(dataObj[3])}`;
          break;
        case FORMAT_DATE.LONG_TIME:
          dateOutput = `${dataObj[1]} ${longEnMonth[dataObj[2]]} ${(dataObj[3])}  Time  ${setTimeToString(dataObj[4])}:${setTimeToString(dataObj[5])}:${setTimeToString(dataObj[6])}`;
          break;
        default:
          dateOutput = `${dataObj[1]} ${longEnMonth[dataObj[2]]} ${(dataObj[3])}`;
          break;
      }

    }
  }

  return dateOutput;

}

export function beteweenEventDate(dateForm?: Date | null | undefined, dateTo?: Date | null | undefined, type?: string | 'SHORT' | 'LONG', lang?: string | 'th' | 'en'): string {

  let dateOutput: any;

  const shortEnMonth = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
    'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];

  const longEnMonth = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const shortThaiMonth = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];

  const longThaiMonth = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  if (dateForm && dateTo) {

    const dataFromObj = [
      dateForm.getDay(),
      dateForm.getDate(),
      dateForm.getMonth(),
      dateForm.getFullYear()
    ];

    const dataToObj = [
      dateTo.getDay(),
      dateTo.getDate(),
      dateTo.getMonth(),
      dateTo.getFullYear()
    ];

    const dayEventPreview = dateForm.getDate() > 10 ? dateForm.getDate() : `0${dateForm.getDate()}`;
    const dayEventEndPreview = dateTo.getDate() > 10 ? dateTo.getDate() : `0${dateTo.getDate()}`;

    if (dateForm.toISOString() === dateTo.toISOString()) {
      switch (type) {
        case FORMAT_DATE.SHORT:
          dateOutput = lang === 'en' ? `${dayEventPreview} ${shortEnMonth[dataFromObj[2]]} ${(dataFromObj[3])}` : `${dayEventPreview} ${shortThaiMonth[dataFromObj[2]]} ${(dataFromObj[3] + 543)}`;
          break;
        case FORMAT_DATE.LONG:
          dateOutput = lang === 'en' ? `${dayEventPreview} ${longEnMonth[dataFromObj[2]]} ${(dataFromObj[3])}` : `${dayEventPreview} ${longThaiMonth[dataFromObj[2]]} ${(dataFromObj[3] + 543)}`;
          break;
        default:
          dateOutput = lang === 'en' ? `${dayEventPreview} ${longEnMonth[dataFromObj[2]]} ${(dataFromObj[3])}` : `${dayEventPreview} ${longThaiMonth[dataFromObj[2]]} ${(dataFromObj[3] + 543)}`;
          break;
      }
    } else {
      switch (type) {
        case FORMAT_DATE.SHORT:
          dateOutput = lang === 'en' ? `${dayEventPreview} ${shortEnMonth[dataFromObj[2]]} - ${dayEventEndPreview} ${shortEnMonth[dataToObj[2]]} ${(dataToObj[3])}` : `${dayEventPreview} ${shortThaiMonth[dataFromObj[2]]} - ${dayEventEndPreview} ${shortThaiMonth[dataToObj[2]]} ${(dataToObj[3] + 543)}`;
          break;
        case FORMAT_DATE.LONG:
          dateOutput = lang === 'en' ? `${dayEventPreview} ${longEnMonth[dataFromObj[2]]} - ${dayEventEndPreview} ${longEnMonth[dataToObj[2]]} ${(dataToObj[3])}` : `${dayEventPreview} ${longThaiMonth[dataFromObj[2]]} - ${dayEventEndPreview} ${longThaiMonth[dataToObj[2]]} ${(dataToObj[3] + 543)}`;
          break;
        default:
          dateOutput = lang === 'en' ? `${dayEventPreview} ${longEnMonth[dataFromObj[2]]} - ${dayEventEndPreview} ${longEnMonth[dataToObj[2]]} ${(dataToObj[3])}` : `${dayEventPreview} ${longThaiMonth[dataFromObj[2]]} - ${dayEventEndPreview} ${longThaiMonth[dataToObj[2]]} ${(dataToObj[3] + 543)}`;
          break;
      }
    }

  } else if (dateForm && !dateTo) {

    const dataFromObj = [
      dateForm.getDay(),
      dateForm.getDate(),
      dateForm.getMonth(),
      dateForm.getFullYear()
    ];

    const dayEventPreview = dateForm.getDate() > 10 ? dateForm.getDate() : `0${dateForm.getDate()}`;

    switch (type) {
      case FORMAT_DATE.SHORT:
        dateOutput = lang === 'en' ? `${dayEventPreview} ${shortEnMonth[dataFromObj[2]]} ${(dataFromObj[3] + 543)}` : `${dayEventPreview} ${shortThaiMonth[dataFromObj[2]]} ${(dataFromObj[3] + 543)}`;
        break;
      case FORMAT_DATE.LONG:
        dateOutput = lang === 'en' ? `${dayEventPreview} ${longEnMonth[dataFromObj[2]]} ${(dataFromObj[3] + 543)}` : `${dayEventPreview} ${longThaiMonth[dataFromObj[2]]} ${(dataFromObj[3] + 543)}`;
        break;
      default:
        dateOutput = lang === 'en' ? `${dayEventPreview} ${longEnMonth[dataFromObj[2]]} ${(dataFromObj[3] + 543)}` : `${dayEventPreview} ${longThaiMonth[dataFromObj[2]]} ${(dataFromObj[3] + 543)}`;
        break;
    }

  }
  // console.log("🚀 ~ file: format-time.ts:295 ~ beteweenEventDate ~ dateOutput:", dateOutput)
  return dateOutput;
}

export function checkDateStatus(
  inputDate: Date | string | number,
  startDate: Date | string | number,
  endDate: Date | string | number
): 'past' | 'upcoming' | 'inRange' {
  const date = new Date(inputDate);
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (date >= start && date <= end) {
    // อยู่ในช่วง start-end
    return 'inRange';
  }

  if (end < now) {
    // หมดช่วงแล้ว (เลยวันปัจจุบันไปแล้ว)
    return 'past';
  }

  if (start > now) {
    // ยังไม่ถึงช่วงนั้น (ยังไม่เลยวันปัจจุบัน)
    return 'upcoming';
  }

  // ถ้าไม่เข้าเงื่อนไขไหนเลย
  return 'past';
}
