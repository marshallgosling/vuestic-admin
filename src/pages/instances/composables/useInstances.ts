import { Ref, ref, unref, watch } from 'vue'
import {
  getInstances,
  getInstanceInfo,
  startInstance,
  stopInstance,
  rebootInstance,
  initInstance,
  deleteInstance,
  updateInstance,
  createInstance,
} from '../../../api/instance'
import { Pagination } from '../../../api/types'
import { Instance, Sorting, Filters } from '../types'
import { watchIgnorable } from '@vueuse/core'

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 15, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: null })
const makeFiltersRef = () => ref<Partial<Filters>>({ status: null, type: null })

export const useInstances = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const instances = ref<Instance[]>([])
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    const { data, pagination: newPagination } = await getInstances({
      ...unref(sorting),
      ...unref(pagination),
      ...unref(filters),
    })
    instances.value = data as Instance[]

    ignoreUpdates(() => {
      pagination.value = newPagination
    })

    isLoading.value = false
  }

  const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  const info = async (id: string) => {
    isLoading.value = true
    const { data } = await getInstanceInfo(id)
    isLoading.value = false
    return data
  }

  watch(
    filters,
    () => {
      // Reset pagination to first page when filters changed
      pagination.value.page = 1
      fetch()
    },
    { deep: true },
  )

  fetch()

  return {
    isLoading,

    filters,
    sorting,
    pagination,

    instances,

    fetch,

    info,

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
