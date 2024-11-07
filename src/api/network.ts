import request from '../services/request'
import { networkList, networkItem,  empty } from './types'
import { Network } from '../pages/networks/types'

enum API {
  LIST_URL = '/network/list',
  CREATE_URL = '/network/create',
  UPDATE_URL = '/network/update',
  DELETE_URL = '/network/delete/',
  INFO_URL = '/network/info/',
  ACTION_URL = '/network/action',
}

export const getNetworks = (query: string) => {
    return request.get<any, networkList>(API.LIST_URL+"?"+query)
}

export const getNetworkInfo = (id: string) => {
    return request.get<any, networkItem>(API.INFO_URL+id)
}

export const deleteNetwork = (id: string) => {
    return request.delete<any, empty>(API.DELETE_URL+id)
}

export const updateNetwork = (network: Network) => {
    return request.put<any, networkItem>(API.UPDATE_URL, network)
}

export const createNetwork = (network: any) => {
    return request.post<any, networkItem>(API.CREATE_URL, network)
}

export const bindNetwork = (network: Network) => {
    return request.post<any, networkItem>(API.ACTION_URL, { action: 'bind', payload: network })
}