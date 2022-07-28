import type {
  Image as ImageFile,
} from 'react-native-image-crop-picker'
import type { Policy } from '../typings/api'
import { Get } from './request'
import { localGet } from './storage'

export function random_string(len?: number) {
  len = len || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < len; i++)
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))

  return pwd
}

export function get_suffix(filename: string) {
  const pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos !== -1)
    suffix = filename.substring(pos)

  return suffix
}

export async function uploadFile(file: ImageFile) {
  const resp = await Get<Policy>('/api/Public/oss/policy')
  const key = random_string() + get_suffix(file.filename as string)

  const filename = resp.dir + key

  const formData = new FormData()
  formData.append('key', filename)
  formData.append('policy', resp.policy)
  formData.append('OSSAccessKeyId', resp.accessid)
  formData.append('success_action_status', '200')
  formData.append('signature', resp.signature)
  formData.append('file', {
    uri: file.path,
    type: file.mime,
    name: file.filename,
  })
  const headers = {
    'Content-Type': 'multipart/form-data',
    'token': await localGet('token'),
  }
  const options = { method: 'post', headers, body: formData }

  await fetch(resp.host, options).then(response => response.json())
  // await axios.post(resp.host, formData, config).catch(error => { Toast.show({ content: "上传失败" }) });
  return `${resp.host}${resp.host.substr(-1) === '/' ? '' : '/'}${filename}`
}

export async function uploadImgFile(file: ImageFile) {
  return uploadFile(file)
}
