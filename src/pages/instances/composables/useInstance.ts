import { ref } from 'vue'
import { getInstanceInfo } from '../../../api/instance'

import { Instance } from '../types'

export const useInstance = (id: string) => {
  const isLoading = ref(false)
  const instance = ref<Instance>({} as Instance)

  const info = async (id: string) => {
    isLoading.value = true
    const { data } = await getInstanceInfo(id)
    instance.value = data
    isLoading.value = false
    return data
  }

  //const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  info(id)

  return {
    isLoading,

    instance,
  }
}
