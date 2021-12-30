


import { localGet } from './storage';
import { getToken, store } from 'src/store';
import actions from 'src/store/actions';
import { baseUrl } from './constants';
import Toast from 'react-native-simple-toast';

interface RespData {
  code: number
  data?: any
  message?: string
}

const request = async function <T>(url, method, data): Promise<T> {
  const errorKey = Symbol()
  let controller = new AbortController();
  let signal = controller.signal;
  const config = generateRequestConfig(url, method, data)

  const res = await Promise.race([
    fetch(config.url, { signal, ...config.options }).then(async response => {
      const text = await response.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        console.warn('RESP failed to parse: ', text);
        throw e;
      }
      return json;
    })
      .then((data: RespData) => {
        // console.log(data);

        if (data.code == 1) return data.data
        if (data.code == 1000) return data
        if (!data.code) return data
        if (data.code == 401) {
          // 清除token
          store.dispatch(actions.logout())
          return new Promise(() => { })
        }
        return Promise.reject(data.message)
      }),
    new Promise(resolve => {
      setTimeout(() => {
        resolve(errorKey)
        return controller.abort()
      }, 10000)

    })
  ])

  if (res === errorKey) {
    Toast.show("请求超时")
    return new Promise(() => { })
  }
  return res
}

export const request1 = async function <T>(url, method, data): Promise<T> {

  const config = generateRequestConfig(url, method, data)
  // console.log(config);

  return fetch(config.url, config.options).then(async response => {
    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      console.warn('RESP failed to parse: ', text);
      throw e;
    }
    return json;
  })
    .then((data: RespData) => {
      // console.log(data);

      if (data.code == 1) return data.data
      if (data.code == 1000) return data
      if (!data.code) return data
      if (data.code == 401) {
        // 清除token
        store.dispatch(actions.logout())
        return new Promise(() => { })
      }
      return Promise.reject(data.message)
    })
}

async function filterError<T>(url, method, data): Promise<T> {
  return await request<T>(url, method, data).catch(error => {
    console.log(error);
    Toast.show(error instanceof Error ? "服务器繁忙" : error)
    return new Promise(() => { })
  })
}

function generateRequestConfig(url, method, data) {
  const headers = {
    'Content-Type': 'application/json',
    "token": getToken()
  }
  const options = { method, headers, }

  if (method.toLowerCase() === 'post') (options['body'] = JSON.stringify(data), data = {})
  return { url: parseUrl(url, data), options, }
}

function parseUrl(url, params) {
  let paramsArray: string[] = [];
  if (params) Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
  if (paramsArray.length) return baseUrl + url + "?" + paramsArray.join('&')
  return baseUrl + url
}

export const Get = <T = any>(url: string, data?: object): Promise<T> => filterError<T>(url, "get", data)
export const Post = <T = any>(url: string, data?: object): Promise<T> => filterError<T>(url, "post", data)

