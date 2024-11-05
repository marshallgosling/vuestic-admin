// type.ts
import type { ResponseData } from './responseType'
import { Instance } from '../pages/instances/types'
import { Network } from '../pages/networks/types'

export interface empty extends ResponseData {}

export interface loginUser extends ResponseData {
  data: {
    token: string
  }
}
// 定义一个接口，用于规范用户的数据类型
export interface userProfile extends ResponseData {
  data: {
    id: number
    name: string
    group: string
    email: string
    avatar: string
  }
}

export interface networkList extends ResponseData {
  data: Network[]
}

export interface storageList extends ResponseData {
  data: Storage[]
}

export interface instanceList extends ResponseData {
  data: Instance[]
}

export interface instanceItem extends ResponseData {
  data: Instance
}

export interface networkItem extends ResponseData {
  data: Network
}