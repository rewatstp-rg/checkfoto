import dayjs from 'dayjs'
import moment from 'moment'

const dateFormat: Record<string, string> = {
  date: 'DD/MM/YYYY',
  dateTime: 'DD/MM/YYYY HH:mm:ss',
  dateTimeRequest: 'YYYY-MM-DD HH:mm:ss',
  dateTFormat: `YYYY-MM-DDTHH:mm:ss.SSS`,
  dateRequest: 'YYYY-MM-DD',
  dateRequestTime: 'DD/MM/YYYY HH:mm:ss',
  monthYear: 'mm-YYYY',
  yearMonthDate: 'YYYYMMDD',
  shortThaiDateTime: 'DD MMM BB | HH:mm',
  thaiDateTime: 'DD/MM/BBBB HH:mm:ss',
}

type FormatType =
  | 'date'
  | 'dateTime'
  | 'dateRequest'
  | 'dateRequestTime'
  | 'monthYear'
  | 'yearMonthDate'
  | 'shortThaiDateTime'
  | 'thaiDateTime'
  | 'dateTFormat'
  | 'dateTimeRequest'

const tFormat = (date: any, format: any) => {
  let dataStr = moment(date).format(dateFormat[format])
  dataStr = `${dataStr}Z`
  return dataStr;
}

const ISOToDate = (date: Date, format: FormatType = 'date') => {
  if (!date) return ''
  if (format === 'dateTimeRequest' || format === 'dateRequest' || format ==='dateRequestTime') return moment(date).format(dateFormat[format])
  if (format === 'dateTFormat') return tFormat(date, format)
  if (format === 'shortThaiDateTime' || format === 'thaiDateTime') return dayjs(date).format(dateFormat[format])
  return moment(date).add(543, 'y').format(dateFormat[format])
}

export default ISOToDate
