

import { localGet } from './storage';
import { getToken, store } from 'src/store';
import actions from 'src/store/actions';
import { baseUrl } from './constants';
import Toast from 'react-native-root-toast';

interface RespData {
  code: number
  data?: any
  message?: string
}

const request1 = async function <T>({ url, options }): Promise<T> {
  const key = Symbol()
  const res = await Promise.race([
    fetch(url, options).then(async response => {
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
      .then(res => {
        const data: RespData = res.data as any
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
      .catch(error => {
        Toast.show(error instanceof Error ? "服务器繁忙" : error)
        return new Promise(() => { })
      }),
    new Promise(resolve => {
      setTimeout(resolve, 10000, key)
    })
  ])
  if (res === key) {
    Toast.show("请求超时")
    return new Promise(() => { })
  }
  return res
}

export const request = async function <T>(url, method, data): Promise<T> {

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
  if (method.toLowerCase() === 'post') options['body'] = JSON.stringify(data)
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

