import { ref } from 'vue'
import {
  getInstances,
  startInstance,
  stopInstance,
  rebootInstance,
  initInstance,
  deleteInstance,
  updateInstance,
  createInstance
} from '../../../api/instance'

import { Instance } from '../types'

export const useInstances = () => {
  const isLoading = ref(false)
  const instances = ref<Instance[]>([])

  const fetch = async () => {
    isLoading.value = true
    const { data } = await getInstances()
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
      await createInstance(instance)
      await fetch()
      isLoading.value = false
    },

    async update(instance: Instance) {
      isLoading.value = true
      await updateInstance(instance)
      await fetch()
      isLoading.value = false
    },

    async remove(instance: Instance) {
      isLoading.value = true
      await deleteInstance(instance.id)
      await fetch()
      isLoading.value = false
    },

    async start(instance: Instance) {
      isLoading.value = true
      await startInstance(instance.id)
      await fetch()
      isLoading.value = false
    },

    async stop(instance: Instance) {
      isLoading.value = true
      await stopInstance(instance.id)
      await fetch()
      isLoading.value = false
    },

    async reboot(instance: Instance) {
      isLoading.value = true
      await rebootInstance(instance.id)
      await fetch()
      isLoading.value = false
    },

    async init(instance: Instance) {
      isLoading.value = true
      await initInstance(instance.id)
      await fetch()
      isLoading.value = false
    }

  }
}
