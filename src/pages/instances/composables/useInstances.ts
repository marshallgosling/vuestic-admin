import { ref } from 'vue'
import {
  getInstances,
  startInstance,
  stopInstance,
  rebootInstance,
  initInstance,
  deleteInstance,
  updateInstance,
  createInstance,
} from '../../../api/instance'

import { Instance } from '../types'

export const useInstances = () => {
  const isLoading = ref(false)
  const instances = ref<Instance[]>([])

  const fetch = async () => {
    isLoading.value = true
    const { data } = await getInstances('all')
    instances.value = data as Instance[]
    isLoading.value = false
  }

  //const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  fetch()

  return {
    isLoading,

    instances,

    fetch,

    async add(instance: Instance) {
      isLoading.value = true
      const $res = await createInstance(instance)
      await fetch()
      isLoading.value = false
      return $res
    },

    async update(instance: Instance) {
      isLoading.value = true
      const $res = await updateInstance(instance)
      await fetch()
      isLoading.value = false
      return $res
    },

    async remove(instance: Instance) {
      isLoading.value = true
      const $res = await deleteInstance(instance.id)
      await fetch()
      isLoading.value = false
      return $res
    },

    async start(instance: Instance) {
      isLoading.value = true
      const $res = await startInstance(instance.id)
      await fetch()
      isLoading.value = false
      return $res
    },

    async stop(instance: Instance) {
      isLoading.value = true
      const $res = await stopInstance(instance.id)
      await fetch()
      isLoading.value = false
      return $res
    },

    async reboot(instance: Instance) {
      isLoading.value = true
      const $res = await rebootInstance(instance.id)
      await fetch()
      isLoading.value = false
      return $res
    },

    async init(instance: Instance) {
      isLoading.value = true
      await initInstance(instance.id)
      await fetch()
      isLoading.value = false
    },
  }
}
