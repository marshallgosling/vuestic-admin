export type KeyPair = {
  id: string
  name: string
  status: number
  created_at: string
}

export type EmptyKeyPair = Omit<KeyPair, 'id' | 'status' | 'created_at'> & {
  name: KeyPair['name'] | ''
}
