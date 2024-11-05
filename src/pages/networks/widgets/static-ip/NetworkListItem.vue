<template>
  <div
    class="min-h-[114px] p-4 rounded-lg border border-dashed border-backgroundBorder flex flex-col sm:flex-row items-start sm:items-center gap-6"
  >
    <div class="flex flex-col gap-2 flex-grow">
      <div class="flex items-center">
        <div class="text-lg font-bold capitalize">{{ network.name }}</div>
        
      </div>
      <div class="flex gap-4 items-center">
        <NetworkLogo :type="network.type" />
        <div>
          <div class="text-secondary">静态 IP {{ network.ip }}</div>
          <div class="text-secondary">已附加到 {{ network.instance ? network.instance.name : '无' }}</div>
        </div>
      </div>
    </div>
    <div class="w-full sm:w-auto flex-none flex sm:block">
      <VaButton class="mr-2 flex-grow" preset="primary" @click="emits('edit')">编辑</VaButton>
      <VaButton icon="mso-delete" preset="primary" aria-label="Remove" @click="emits('remove')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import NetworkLogo from '../../network-logo/NetworkLogo.vue'
import { Network } from '../../types'

const emits = defineEmits(['edit', 'remove'])

const props = defineProps<{
  network: Network
}>()

// const network = computed(() => props.network)

// const expirationDateString = computed(() => {
//   const e = props.card.expirationDate
//   return `${e[0]}${e[1]}/${e[2]}${e[3]}`
// })
</script>
