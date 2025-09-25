import { ref } from 'vue'
import { getStorageConfig } from '../../../api/storage'

import { StorageConfig } from '../types'

export const useStorageConfig = () => {
  const isLoading = ref(false)
  const list = ref<StorageConfig[]>([])

  const fetch = async () => {
    isLoading.value = true
    const { data } = await getStorageConfig('all')
    list.value = data as StorageConfig[]
    isLoading.value = false
  }

  //const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  fetch()

  return {
    isLoading,

    list,

    fetch,
  }
}
