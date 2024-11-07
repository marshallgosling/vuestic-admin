import { ref } from 'vue'
import {
  getKeyPairs,
  createKeyPair,
  enableKeyPair,
  deleteKeyPair
} from '../../../api/keypairs'

import { KeyPair } from '../types'

export const useKeyPairs = () => {
  const isLoading = ref(false)
  const keys = ref<KeyPair[]>([])

  const fetch = async () => {
    isLoading.value = true
    const { data } = await getKeyPairs('all')
    keys.value = data as KeyPair[]
    isLoading.value = false
  }

  //const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  fetch()

  return {
    isLoading,

    keys,

    fetch,

    async add(key: KeyPair) {
      isLoading.value = true
      const $res = await createKeyPair(key)
      await fetch()
      isLoading.value = false
      return $res
    },

    async remove(key: KeyPair) {
      isLoading.value = true
      const $res = await deleteKeyPair(key.id)
      await fetch()
      isLoading.value = false
      return $res
    },

    async enable(key: KeyPair) {
      isLoading.value = true
      const $res = await enableKeyPair(key.id)
      await fetch()
      isLoading.value = false
      return $res
    }
  }
}
