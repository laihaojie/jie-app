import { navigate } from 'src/utils/navigationService';
import { getToken, store } from 'src/store';
import actions from 'src/store/actions';
import { baseUrl } from './constants';
import Toast from 'react-native-simple-toast';

interface RespData {
  code: number
  data?: any
  message?: string
}

export const request = async function <T = any>(url, method, data): Promise<T> {
  const errorKey = Symbol()
  const controller = new AbortController();
  const signal = controller.signal;
  const config = generateRequestConfig(url, method, data)
  let timer;


  const res = await Promise.race([
    fetch(config.url, { signal, ...config.options }).then(async response => {
      const text = await response.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        console.warn('RESP failed to parse: ', text);
        json = {}
        // throw e;
      }
      return json;
    }).then((data: RespData) => {
      // console.log(data);
      clearTimeout(timer)
      if (data.code == 1) return data.data
      if (data.code == 1000) return data
      if (!data.code) return data
      if (data.code == 401) {
        // 清除token
        store.dispatch(actions.logout())
        navigate("LoginScreen")
        return new Promise(() => { })
      }
      return Promise.reject(data.message)
    }).catch(e => {
      Toast.show(e)
    }),
    new Promise(resolve => {
      timer = setTimeout(() => {
        resolve(errorKey)
        return controller.abort()
      }, 10000)

    })
  ])
  console.log({ ...config, Response: res });
  return res === errorKey ? Promise.reject("请求超时") : res
}

async function filterError<T>(url, method, data): Promise<T> {
  return await request<T>(url, method, data).catch(error => {
    console.log(error);
    Toast.show(error instanceof Error ? "服务器繁忙" : error)
    return Promise.reject("")
  })
}

function generateRequestConfig(url, method, data) {
  const headers = {
    'Content-Type': 'application/json',
    "authorization": getToken()
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

