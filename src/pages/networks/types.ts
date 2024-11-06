import { Instance } from "../instances/types"

export enum PaymentSystemType {
  Visa = 'visa',
  MasterCard = 'mastercard',
}

export const paymentSystemTypeOptions = Object.values(PaymentSystemType)

export type Network = {
  id: string
  name: string
  ip: string
  netmask: string
  gateway: string
  type: string
  status: Status
  created_at: string
  instance_id: string
  instance_name: string
}

export type EmptyNetwork = Omit<Network, 'ip' | 'netmask' | 'gateway' | 'status' | 'created_at' | 'instance_name' > & {
  id: Network['id'] | ''
  name: Network['name'] | ''
  instance_id: Network['instance_id'] | ''
  type: string | 'static'
}

export enum Status {
  creating, created, starting, running, stopping, stopped, failed, error, deleting, deleted, banned
}

export const StatusStringMap: Record<number, string> = {
  0: '创建中',
  1: '可运行',
  2: '启动中',
  3: '运行中',
  4: '停止中',
  5: '已停止',
  6: '启动失败',
  7: '错误',
  8: '删除中',
  9: '已删除',
  10: '封禁',
}

export const StatusColorMap: Record<number, string> = {
  0: 'secondary',
  1: 'primary',
  2: 'success',
  3: 'success',
  4: 'danger',
  5: 'danger',
  6: 'warning',
  7: 'danger',
  8: 'danger',
  9: 'gray',
  10: 'black',
}

export interface PaymentCard {
  id: string
  name: string
  isPrimary: boolean // show Primary badge
  paymentSystem: PaymentSystemType // Enum or union type for various payment systems
  cardNumberMasked: string // ****1679
  expirationDate: string // 09/24
}

export interface BillingAddress {
  id: string
  name: string
  isPrimary: boolean // show Primary badge
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}
