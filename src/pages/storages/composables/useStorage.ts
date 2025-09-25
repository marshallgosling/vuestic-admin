import { Ref, ref, unref } from 'vue'
import { getStorage } from '../../../api/storage'
import { Pagination } from '../../../api/types'
import { Storage } from '../types'
import { watchIgnorable } from '@vueuse/core'

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 15, total: 0 })

export const useStorage = (options?: { pagination?: Ref<Pagination> }) => {
  const isLoading = ref(false)
  const storages = ref<Storage[]>([])
  const { pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    const { data, pagination: newPagination } = await getStorage({ ...unref(pagination) })
    storages.value = data as Storage[]

    ignoreUpdates(() => {
      pagination.value = newPagination
    })

    isLoading.value = false
  }

  const { ignoreUpdates } = watchIgnorable([pagination], fetch, { deep: true })

  fetch()

  return {
    isLoading,

    storages,

    pagination,

    fetch,
  }
}
