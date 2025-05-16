import { ref } from 'vue'
import { getInstanceInfo, getInstanceMetadata } from '../../../api/instance'

import { Instance, Metadata } from '../types'

export const useInstance = (id: string) => {
  const isLoading = ref(false)
  const instance = ref<Instance>({} as Instance)
  const metadata = ref<Metadata>({} as Metadata)

  const info = async (id: string) => {
    isLoading.value = true
    const a = await getInstanceInfo(id)
    instance.value = a.data

    const b = await getInstanceMetadata(id)
    metadata.value = b.data
    isLoading.value = false
  }

  //const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  info(id)

  return {
    isLoading,

    instance,

    metadata,
  }
}
