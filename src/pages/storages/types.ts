import { NetworkConfig } from '../networks/types'
import { Instance } from '../instances/types'

export type Storage = {
  id: string
  name: string
  amount: string
  status: Status
  description: string
  instance: Instance
  created_at: string
}

export type StorageConfig = {
  id: string
  name: string
  size: string
  type: string
  network: NetworkConfig
  description: string
  status: Status
}

export enum Status {
  creating,
  created,
  starting,
  running,
  stopping,
  stopped,
  failed,
  error,
  deleting,
  deleted,
  banned,
}

export type EmptyKeyPair = Omit<Storage, 'id' | 'status' | 'created_at'> & {
  name: Storage['name'] | ''
}

export type Sorting = {
  sortBy: string | undefined
  sortingOrder: 'asc' | 'desc' | null
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
