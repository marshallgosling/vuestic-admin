import request from '../services/request'
import { instanceList, instanceItem,  empty } from './types'
import { Instance } from '../pages/instances/types'

enum API {
  INSTANCE_LIST_URL = '/instance/list',
  INSTANCE_CREATE_URL = '/instance/create',
  INSTANCE_UPDATE_URL = '/instance/update',
  INSTANCE_DELETE_URL = '/instance/',
  INSTANCE_INFO_URL = '/instance/info/',
  INSTANCE_ACTION_URL = '/instance/action',
}

export const getInstances = (query: string) => {
    return request.get<any, instanceList>(API.INSTANCE_LIST_URL+"?"+query)
}

export const getInstanceInfo = (id: string) => {
    return request.get<any, instanceItem>(API.INSTANCE_INFO_URL+id)
}

export const startInstance = (id: string) => {
    return request.post<any, empty>(API.INSTANCE_ACTION_URL, { action: "start", id })
}

export const stopInstance = (id: string) => {
    return request.post<any, empty>(API.INSTANCE_ACTION_URL, { action: "stop", id })
}

export const rebootInstance = (id: string) => {
    return request.post<any, empty>(API.INSTANCE_ACTION_URL, { action: "reboot", id })
}

export const initInstance = (id: string) => {
    return request.post<any, empty>(API.INSTANCE_ACTION_URL, { action: "init", id })
}

export const deleteInstance = (id: string) => {
    return request.delete<any, empty>(API.INSTANCE_DELETE_URL+id)
}

export const updateInstance = (instance: Instance) => {
    return request.put<any, instanceItem>(API.INSTANCE_UPDATE_URL, instance)
}

export const createInstance = (instance: Instance) => {
    return request.put<any, instanceItem>(API.INSTANCE_UPDATE_URL, instance)
}
