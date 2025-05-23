<template>
  <div class="grid md:grid-cols-4 grid-cols-1 gap-4">
    <template v-if="loading">
      <div
        v-for="i in 4"
        :key="i"
        class="min-h-[114px] p-4 rounded-lg border border-dashed border-backgroundBorder flex flex-row items-center gap-6"
      >
        <div class="flex flex-col gap-2 flex-grow">
          <VaSkeleton class height="1.5rem" variant="text" width="10rem" />
          <div class="flex gap-4">
            <VaSkeleton height="3rem" variant="rounded" width="5rem" />
            <VaSkeleton :lines="2" variant="text" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <NetworkListItem
        v-for="network in networks"
        :key="network.id"
        :network="network"
        @edit="networkToEdit = network"
        @remove="networkToDelete = network"
        @bind="networkToBind = network"
      />
      <div
        class="sm:h-[114px] p-4 rounded-lg border border-dashed border-primary flex flex-col sm:flex-row items-start sm:items-center gap-4"
        :style="{ backgroundColor: colorToRgba(getColor('primary'), 0.07) }"
      >
        <div class="flex flex-col gap-2 flex-grow">
          <div class="text-lg font-bold leading-relaxed">{{ t('network.create') }}</div>
          <div class="text-secondary text-sm leading-tight">
            {{ t('network.help_create') }}
          </div>
        </div>
        <VaButton class="flex-none w-full sm:w-auto" @click="showCreate = true">{{ t('network.create') }}</VaButton>
      </div>
    </template>
  </div>
  <NetworkCreateModal v-if="showCreate" @close="showCreate = false" @reload="reload" />
  <NetworkUpdateModal
    v-if="networkToEdit"
    :network="networkToEdit"
    @close="networkToEdit = undefined"
    @reload="reload"
  />
  <NetworkBindModal
    v-if="networkToBind"
    :network="networkToBind"
    :instance-list-options="instanceListOptions"
    @close="networkToBind = undefined"
    @reload="reload"
  />
  <NetworkDeleteModal v-if="networkToDelete" @delete="remove" @close="networkToDelete = undefined" />
</template>

<script lang="ts" setup>
import NetworkListItem from './NetworkListItem.vue'
import { ref, unref } from 'vue'
import { useColors } from 'vuestic-ui'
import { Network } from '../../types'
import { useToast } from 'vuestic-ui'
import NetworkCreateModal from './NetworkCreateModal.vue'
import NetworkUpdateModal from './NetworkUpdateModal.vue'
import NetworkBindModal from './NetworkBindModal.vue'
import { deleteNetwork, getNetworks } from '../../../../api/network'
import { getInstances } from '../../../../api/instance'
import { useI18n } from 'vue-i18n'
import NetworkDeleteModal from './NetworkDeleteModal.vue'
import { Pagination } from '../../../../api/types'
import { Sorting, Filters } from '../../../instances/types'
const { t } = useI18n()

const loading = ref(false)
const networks = ref<Network[]>()
let instanceListOptions: any[]

const fetch = async () => {
  loading.value = true
  const { data } = await getNetworks('all')
  networks.value = data
  loading.value = false
}

fetch()

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 20, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: null })
const makeFiltersRef = () => ref<Partial<Filters>>({ status: null, type: null })
const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = {}
const fetchInstance = async () => {
  const instanceList = await getInstances({
    ...unref(sorting),
    ...unref(pagination),
    ...unref(filters),
  })
  instanceListOptions = instanceList.data.map((instance) => {
    return {
      label: instance.name,
      value: instance.id,
    }
  })
}

fetchInstance()

const showCreate = ref<boolean>(false)
const networkToEdit = ref<Network>()
const networkToBind = ref<Network>()
const networkToDelete = ref<Network>()
const { init } = useToast()

const remove = async (network: Network) => {
  const res = await deleteNetwork(network.id)
  init({ message: res.message, color: res.code == 200 ? 'success' : 'danger' })
  fetch()
}

const reload = () => {
  fetch()
}

const { getColor, colorToRgba } = useColors()
</script>
