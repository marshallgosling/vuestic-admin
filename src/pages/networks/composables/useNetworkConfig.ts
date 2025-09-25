import { ref } from 'vue'
import { getNetworkConfigs } from '../../../api/network'

import { NetworkConfig } from '../types'

export const useNetworkConfig = () => {
  const isLoading = ref(false)
  const list = ref<NetworkConfig[]>([])

  const fetch = async () => {
    isLoading.value = true
    const { data } = await getNetworkConfigs('all')
    list.value = data as NetworkConfig[]
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
