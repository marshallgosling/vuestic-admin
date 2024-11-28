import request from '../services/request'
import { keypairList, keypairItem, empty } from './types'
import { KeyPair } from '../pages/keypairs/types'

enum API {
  LIST_URL = '/keypair/list',
  CREATE_URL = '/keypair/create',
  DELETE_URL = '/keypair/delete/',
  ACTION_URL = '/keypair/action',
  DOWNLOAD_URL = '/keypair/download/',
}

export const getKeyPairs = (query: string) => {
  return request.get<any, keypairList>(API.LIST_URL + '?' + query)
}

export const createKeyPair = (key: KeyPair) => {
  return request.post<any, keypairItem>(API.CREATE_URL, key)
}

export const deleteKeyPair = (id: string) => {
  return request.delete<any, empty>(API.CREATE_URL + id)
}

export const enableKeyPair = (id: string) => {
  return request.post<any, empty>(API.ACTION_URL, { action: 'enable', id })
}

export const downloadKeyPair = (id: string) => {
  return request.get<any, any>(API.DOWNLOAD_URL + id)
}
