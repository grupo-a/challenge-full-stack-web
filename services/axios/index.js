import axios from 'axios'
import Headers from '../headers'

export async function post(url, param, typeHeader, convertData) {
  const urlAccess = process.env.BASE_URL + url

  const headers = await Headers(typeHeader)
  let parameter = param

  if (convertData == 'S') {
    parameter = JSON.stringify(param)
  }
  return await axios.post(urlAccess, parameter, {
    headers,
  })
}

export async function get(url, typeHeader) {
  const urlAccess = process.env.BASE_URL + url

  const headers = await Headers(typeHeader)

  return await axios.get(urlAccess, {
    headers,
  })
}

export async function del(url, typeHeader) {
  const urlAccess = process.env.BASE_URL + url
  const headers = await Headers(typeHeader)

  return await axios.delete(urlAccess, {
    headers,
  })
}

export async function put(url, param, typeHeader, convertData) {
  const urlAccess = process.env.BASE_URL + url

  const headers = await Headers(typeHeader)
  let parameter = param
  if (convertData === 'S') {
    parameter = JSON.stringify(param)
  }
  return await axios.put(urlAccess, parameter, {
    headers,
  })
}

