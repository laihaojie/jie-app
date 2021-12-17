export function isMobile(value: any): boolean { return /^1[3|4|5|7|8][0-9]{9}/.test(value.toString()); }

export function isString(obj: any): boolean { return Object.prototype.toString.call(obj) === '[object String]' }

export function isNumber(obj: any): boolean { return Object.prototype.toString.call(obj) === '[object Number]' }

export function isObject(obj: any): boolean { return Object.prototype.toString.call(obj) === '[object Object]' }

export function isArray(value: any): boolean { return value instanceof Array }

export const isFunction = (fun: any): boolean => { return Object.prototype.toString.call(fun) === '[object Function]' }

export const isUndefined = (val: any): boolean => { return val === void 0 }

export const isDefined = (val: any): boolean => {
  return val !== undefined && val !== null
}

export const isEmpty = function (val: any): boolean {
  if (val == null) return true
  if (typeof val === 'boolean') return false
  if (typeof val === 'number') return !val
  if (val instanceof Error) return val.message === ''
  switch (Object.prototype.toString.call(val)) {
    case '[object String]':
    case '[object Array]':
      return !val.length
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }
  return false
}

export function getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str: string) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}


/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func: Function, wait: number, immediate: boolean) {
  let timeout: any, args: any, context: any, timestamp: any, result: any
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (this: any, ...args: any[]) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args as any[])
      context = args = null as any
    }
    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source: any) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}





