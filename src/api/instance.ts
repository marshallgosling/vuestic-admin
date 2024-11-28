import request from '../services/request'
import { instanceList, instanceItem, instancePrice, empty, Pagination } from './types'
import { Instance, Filters, Sorting } from '../pages/instances/types'

enum API {
  LIST_URL = '/instance/list',
  PRICE_URL = '/instance/price',
  CREATE_URL = '/instance/create',
  UPDATE_URL = '/instance/update',
  DELETE_URL = '/instance/delete/',
  INFO_URL = '/instance/info/',
  ACTION_URL = '/instance/action',
}

export const getInstances = (filters: Partial<Pagination & Sorting & Filters>) => {
  const { sortBy, sortingOrder } = filters
  const { page = 1, perPage = 10 } = filters || {}
  const query = new URLSearchParams()

  if (sortBy) query.set('sortBy', sortBy)
  if (sortingOrder) query.set('sortingOrder', sortingOrder)

  if (page) query.set('page', page.toString())
  if (perPage) query.set('perPage', perPage.toString())

  return request.get<any, instanceList>(API.LIST_URL + '?' + query.toString())
}

export const getInstanceInfo = (id: string) => {
  return request.get<any, instanceItem>(API.INFO_URL + id)
}

export const startInstance = (id: string) => {
  return request.post<any, empty>(API.ACTION_URL, { action: 'start', id })
}

export const stopInstance = (id: string) => {
  return request.post<any, empty>(API.ACTION_URL, { action: 'stop', id })
}

export const rebootInstance = (id: string) => {
  return request.post<any, empty>(API.ACTION_URL, { action: 'reboot', id })
}

export const initInstance = (id: string) => {
  return request.post<any, empty>(API.ACTION_URL, { action: 'init', id })
}

export const deleteInstance = (id: string) => {
  return request.delete<any, empty>(API.DELETE_URL + id)
}

export const updateInstance = (instance: Instance) => {
  return request.put<any, instanceItem>(API.UPDATE_URL, instance)
}

export const createInstance = (instance: Instance) => {
  return request.post<any, instanceItem>(API.CREATE_URL, instance)
}

export const getInstancePrices = () => {
  return request.get<any, instancePrice>(API.PRICE_URL)
}
