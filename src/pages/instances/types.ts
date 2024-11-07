import { Network } from "../networks/types"

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: 'created_at' | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export enum InstanceType {
  small = 'NVIDIA H800, vCPUs:104,RAM:900  GiB,STORAGE:11 TiB SSD',
  media = 'NVIDIA H800, vCPUs:208,RAM:1800 GiB,STORAGE:22 TiB SSD',
}

export enum DomainList {
  AZ1 = '区域 A',
  AZ2 = '区域 B',
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

export type Instance = {
  id: string
  name: string
  status: Status
  domain: string
  description: string
  instance_type: string
  created_at: string
  key_name: string
  networks: Network[]
  storages: Storage[]
}

export type EmptyInstance = Omit<Instance, 'id' | 'status' | 'instance_type' | 'networks' | 'storages' | 'created_at' | 'key_name'> & {
  name: Instance['name'] | ''
  domain: Instance['domain'] | ''
  description: Instance['description'] | ''
  instance_type: Instance['instance_type'] | ''
}

export type Storage = {
  id: string
  name: string
  amount: string
  status: Status
  description: string
  created_at: string
}