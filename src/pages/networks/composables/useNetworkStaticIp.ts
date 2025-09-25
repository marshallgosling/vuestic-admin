import { ref } from 'vue'
import { getNetworks } from '../../../api/network'

import { Network } from '../types'

export const useNetworkStaticIp = () => {
  const isLoading = ref(false)
  const list = ref<Network[]>([])

  const fetch = async () => {
    isLoading.value = true
    const { data } = await getNetworks('all')
    list.value = data as Network[]
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
