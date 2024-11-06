<template>
  <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
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
        @remove="remove(network)"
        @bind="networkToBind = network"
      />
      <div
        class="sm:h-[114px] p-4 rounded-lg border border-dashed border-primary flex flex-col sm:flex-row items-start sm:items-center gap-4"
        :style="{ backgroundColor: colorToRgba(getColor('primary'), 0.07) }"
      >
        <div class="flex flex-col gap-2 flex-grow">
          <div class="text-lg font-bold leading-relaxed">创建静态IP</div>
          <div class="text-secondary text-sm leading-tight">
            请合理创建您的静态 IP 地址库，以便您在需要时可以快速找到它们。
          </div>
        </div>
        <VaButton class="flex-none w-full sm:w-auto" @click="showCreate = true">创建静态IP</VaButton>
      </div>
    </template>
  </div>
  <NetworkCreateModal v-if="showCreate" @close="showCreate = false" @reload="reload" />
  <NetworkUpdateModal v-if="networkToEdit" :network="networkToEdit" @close="networkToEdit=undefined" @reload="reload" />
  <NetworkBindModal v-if="networkToBind" :network="networkToBind" @close="networkToBind=undefined" @reload="reload" />
</template>

<script lang="ts" setup>
import NetworkListItem from './NetworkListItem.vue'
import { ref } from 'vue'
import { useColors } from 'vuestic-ui'
import { Network } from '../../types'
import { useModal, useToast } from 'vuestic-ui'
import NetworkCreateModal from './NetworkCreateModal.vue'
import NetworkUpdateModal from './NetworkUpdateModal.vue'
import NetworkBindModal from './NetworkBindModal.vue'
import { deleteNetwork, getNetworks } from '../../../../api/network'
import { getInstances } from '../../../../api/instance'

const loading = ref(false)
const networks = ref<Network[]>();
var instanceListOptions: {}[];

const fetch = async () => {
    loading.value = true
    const { data } = await getNetworks('all')
    networks.value = data
    loading.value = false
}

fetch()

const fetchInstance = async () => {
  const instanceList = await getInstances('new');
  instanceListOptions = instanceList.data.map((instance) => {
    return {
      label: instance.name,
      value: instance.id,
    }})
}

fetchInstance()

const { confirm } = useModal()

const showCreate = ref<boolean>(false)
const networkToEdit = ref<Network>()
const networkToBind = ref<Network>()
const { init } = useToast()

const remove = async (network: Network) => {
  confirm({
    message: '确认要删除该静态IP吗？',
    size: 'small',
    maxWidth: '380px',
  }).then(async (ok) => {
    if (!ok) return
    const res = await deleteNetwork(network.id)
    init({ message: res.message, color: res.code == 200 ? 'success' : 'error' })
    fetch()
  })
}

const reload = () => {
  fetch()
}

const { getColor, colorToRgba } = useColors()
</script>
