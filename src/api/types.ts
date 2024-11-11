// type.ts
import type { ResponseData } from './responseType'
import { Instance } from '../pages/instances/types'
import { Network } from '../pages/networks/types'
import { KeyPair } from '../pages/keypairs/types'
import { Invoice } from '../pages/billing/types'
import { PaymentCard } from '../pages/payments/types'

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
    email: string
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

export interface keypairList extends ResponseData {
  data: KeyPair[]
}

export interface keypairItem extends ResponseData {
  data: KeyPair
}

export interface invoiceList extends ResponseData {
  data: Invoice[]
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