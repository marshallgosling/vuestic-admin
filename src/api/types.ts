// type.ts
import type { ResponseData } from './responseType'
import { Instance, Metadata } from '../pages/instances/types'
import { Network, NetworkConfig } from '../pages/networks/types'
import { KeyPair } from '../pages/keypairs/types'
import { Invoice } from '../pages/billing/types'
import { PaymentCard } from '../pages/payments/types'
import { InstancePrice } from '../pages/pricing-plans/types'
import { Storage, StorageConfig } from '../pages/storages/types'

export interface empty extends ResponseData {}

export interface loginUser extends ResponseData {
  data: {
    token: string
    user: {
      uid: number
      type: number
      menu: any
    }
  }
}
// 定义一个接口，用于规范用户的数据类型
export interface userProfile extends ResponseData {
  data: {
    id: number
    uid: string
    name: string
    email: string
  }
}
export type Pagination = {
  page: number
  perPage: number
  total: number
}

export interface networkList extends ResponseData {
  data: Network[]
  pagination: Pagination
}

export interface networkConfigList extends ResponseData {
  data: NetworkConfig[]
  pagination: Pagination
}

export interface storageList extends ResponseData {
  data: Storage[]
  pagination: Pagination
}

export interface storageConfigList extends ResponseData {
  data: StorageConfig[]
  pagination: Pagination
}

export interface instanceList extends ResponseData {
  data: Instance[]
  pagination: Pagination
}

export interface instanceItem extends ResponseData {
  data: Instance
}

export interface networkItem extends ResponseData {
  data: Network
  pagination: Pagination
}

export interface keypairList extends ResponseData {
  data: KeyPair[]
}

export interface keypairItem extends ResponseData {
  data: KeyPair
}

export interface invoiceList extends ResponseData {
  data: Invoice[]
  pagination: Pagination
}

export interface invoiceItem extends ResponseData {
  data: Invoice
}

export interface paymentCardList extends ResponseData {
  data: PaymentCard[]
}

export interface paymentCardItem extends ResponseData {
  data: PaymentCard
}

export interface instancePrice extends ResponseData {
  data: InstancePrice[]
}

export interface instanceMetadata extends ResponseData {
  data: Metadata
}
