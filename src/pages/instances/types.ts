import { Billing } from '../billing/types'
import { Network, NetworkConfig } from '../networks/types'
import { Storage } from '../storages/types'

export enum InstanceType {
  small = 'NVIDIA VRAM/GPU:24 GB,vCPUs:8,RAM:50 GiB,STORAGE:0.5 TiB SSD',
  medium = 'NVIDIA VRAM/GPU:40 GB,vCPUs:13,RAM:100 GiB,STORAGE:1 TiB SSD',
  large = 'NVIDIA VRAM/GPU:80 GB,vCPUs:26,RAM:225 GiB,STORAGE:2.75 TiB SSD',
  x2large = 'NVIDIA VRAM/GPU:80 GB,vCPUs:52,RAM:450 GiB,STORAGE:5.5 TiB SSD',
  x4large = 'NVIDIA VRAM/GPU:80 GB,vCPUs:104,RAM:900 GiB,STORAGE:11 TiB SSD',
  x8Large = 'NVIDIA VRAM/GPU:80 GB,vCPUs:208,RAM:1800 GiB,STORAGE:22 TiB SSD',
}

export enum DomainList {
  AZ1 = '区域 A',
  AZ2 = '区域 B',
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

export const DomainStringMap: Record<string, string> = {
  GC: 'GLOBEL COMPUTER CENTER',
  PT: 'PT. Telkom Data Ekosistem',
}

export const ProfileStringMap: Record<string, string> = {
  '-': '-',
  x4large: 'NVIDIA 4 GPU vCPUs:148,RAM:1000 GiB,STORAGE:24 TiB SSD',
  x8large: 'NVIDIA 8 GPU vCPUs:294,RAM:2000 GiB,STORAGE:48 TiB SSD',
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

export type Log = {
  id: number
  name: string
  flag: string
  created_at: string
}

export type Sorting = {
  sortBy: string | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export type Filters = {
  status: number | null
  type: string | null
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
  image_url: string
  networks: Network[]
  securities: Security[]
  billings: Billing[]
  storages: Storage[]
  logs: Log[]
}

export type Metadata = {
  id: string
  name: string
  project: string
  profile: string
  status: Status
  cluster: string
  created_at: string
  network: NetworkConfig
  services: Service[]
}

export type EmptyInstance = Omit<
  Instance,
  | 'id'
  | 'status'
  | 'instance_type'
  | 'networks'
  | 'storages'
  | 'created_at'
  | 'key_name'
  | 'securities'
  | 'billings'
  | 'image_url'
  | 'logs'
> & {
  name: Instance['name'] | ''
  domain: Instance['domain'] | ''
  description: Instance['description'] | ''
  instance_type: Instance['instance_type'] | ''
}

export type Security = {
  id: number
  name: string
  proto: string
  port: string
  help?: string
}

export type Service = {
  id: string
  name: string
  status: string
  service_type: string
  api_key: string
  model: string
  url: string
}
