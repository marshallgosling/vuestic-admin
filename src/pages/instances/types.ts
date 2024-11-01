export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: 'created_at' | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export type Instance = {
  id: string
  name: string
  status: 'init' | 'starting' | 'running' | 'stopping' | 'stopped' | 'deleting' | 'deleted' | 'banned' | 'error'
  domain: string
  description: string
  created_at: string
  networks: Network[]
  storages: Storage[]
}

export type EmptyInstance = Omit<Instance, 'id' | 'name' | 'domain' | 'status' | 'created_at'> & {
  name: Instance['name'] | ''
  domain: Instance['domain'] | undefined
  status: Instance['status'] | 'init'
  created_at: Instance['created_at'] | undefined
}

export type Network = {
  id: string
  name: string
  ip: string
  netmask: string
  gateway: string
  status: 'init' | 'starting' | 'running' | 'stopping' | 'stopped' | 'deleting' | 'deleted' | 'banned' | 'error'
  description: string
  created_at: string
}

export type Storage = {
  id: string
  name: string
  amount: string
  status: 'init' | 'starting' | 'running' | 'stopping' | 'stopped' | 'deleting' | 'deleted' | 'banned' | 'error'
  description: string
  created_at: string
}