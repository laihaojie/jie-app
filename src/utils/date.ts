/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: string | number, cFormat?: string) {
  if (arguments.length === 0 || !time) return null
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  }
  else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time))
        time = parseInt(time)
      else
        time = time.replace(new RegExp(/-/gm), '/')
    }

    if (typeof time === 'number' && time.toString().length === 10)
      time = time * 1000

    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time: any, option?: string) {
  if ((time.toString()).length === 10)
    time = time * 1000
  else
    time = time.replace(new RegExp(/-/gm), '/')

  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d.getTime()) / 1000
  if (diff < 30) return '刚刚'
  if (diff < 3600) return `${Math.ceil(diff / 60)}分钟前`
  if (diff < 3600 * 24) return `${Math.ceil(diff / 3600)}小时前`
  if (diff < 3600 * 24 * 2) return '1天前'
  if (option) return parseTime(time, option)
  return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`
}

export function DateFormat(date: any, fmt: any) { // author: meizz
  const o: any = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1
      .length))
  }
  for (const k in o)
    if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
  return fmt
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type: string) {
  if (type === 'start')
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  else
    return new Date(new Date().toDateString())
}

/**
 * 倒计时
 * @param timeStr 时间字符串
 */
export function countDown(timeStr): { hour: string; minute: string; second: string } {
  const obj = { hour: '00', minute: '00', second: '00' }
  // 获取当前时间
  const nowTime = Date.now()
  const endTime = new Date(timeStr.replace(new RegExp(/-/gm), '/')).getTime()
  if (nowTime > endTime) return obj
  // 获取时间差
  const timediff = Math.round((endTime - nowTime) / 1000)

  // 获取还剩多少小时
  const hour = ~~(timediff / 3600 % 24)
  // 获取还剩多少分钟
  const minute = ~~(timediff / 60 % 60)
  // 获取还剩多少秒
  const second = ~~(timediff % 60)

  return Object.assign(obj, {
    hour: String(hour).padStart(2, '0'),
    minute: String(minute).padStart(2, '0'),
    second: String(second).padStart(2, '0'),
  })
}

