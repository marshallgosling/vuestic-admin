import request from '../services/request'
import { storageList, storageConfigList, Pagination } from './types'

enum API {
  LIST_URL = '/storage/list',
  CONFIG_URL = '/storage/config',
}

export const getStorage = (filters: Partial<Pagination>) => {
  const { page = 1, perPage = 15 } = filters || {}
  const query = new URLSearchParams()

  if (page) query.set('page', page.toString())
  if (perPage) query.set('perPage', perPage.toString())

  return request.get<any, storageList>(API.LIST_URL + '?' + query.toString())
}

export const getStorageConfig = (query: string) => {
  return request.get<any, storageConfigList>(API.CONFIG_URL + '?' + query)
}
