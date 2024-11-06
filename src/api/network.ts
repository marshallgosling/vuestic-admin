import request from '../services/request'
import { networkList, networkItem,  empty } from './types'
import { Network } from '../pages/networks/types'

enum API {
  NETWORK_LIST_URL = '/network/list',
  NETWORK_CREATE_URL = '/network/create',
  NETWORK_UPDATE_URL = '/network/update',
  NETWORK_DELETE_URL = '/network/',
  NETWORK_INFO_URL = '/network/info/',
  NETWORK_ACTION_URL = '/network/action',
}

export const getNetworks = (query: string) => {
    return request.get<any, networkList>(API.NETWORK_LIST_URL+"?"+query)
}

export const getNetworkInfo = (id: string) => {
    return request.get<any, networkItem>(API.NETWORK_INFO_URL+id)
}

export const deleteNetwork = (id: string) => {
    return request.delete<any, empty>(API.NETWORK_DELETE_URL+id)
}

export const updateNetwork = (network: Network) => {
    return request.put<any, networkItem>(API.NETWORK_UPDATE_URL, network)
}

export const createNetwork = (network: any) => {
    return request.put<any, networkItem>(API.NETWORK_CREATE_URL, network)
}

export const bindNetwork = (network: Network) => {
    return request.post<any, networkItem>(API.NETWORK_ACTION_URL, { action: 'bind', payload: network })
}