import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// 将utc加入dayjs里面
dayjs.extend(utc)

// 格式化的默认值
const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss'

export function formatUtcToString(
  utctime: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utctime).format(format)
}
