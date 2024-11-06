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
          <div class="text-secondary">{{ network.instance_id ? '已附加到 '+network.instance_name : '未绑定实例' }}  <VaButton v-if="network.instance_id == ''" size="small" preset="primary" @click="emits('bind')">绑定</VaButton></div>
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
import NetworkLogo from '../../network-logo/NetworkLogo.vue'
import { Network } from '../../types'

const emits = defineEmits(['edit', 'remove', 'bind'])

const props = defineProps<{
  network: Network
}>()

</script>
