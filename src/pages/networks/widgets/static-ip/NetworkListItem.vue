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
          <div class="text-secondary">{{ t('network.static_ip_list') }} {{ network.ip }}</div>
          <div class="text-secondary">
            {{
              network.instance_id
                ? t('network.bind_instance', { instance: network.instance_name })
                : t('network.no_instance')
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-full sm:w-auto flex-none flex sm:block">
      <VaButton v-if="network.instance_id == ''" class="mr-2 flex-grow" preset="primary" @click="emits('bind')">{{
        t('network.bind')
      }}</VaButton>
      <VaButton icon="mso-delete" color="danger" preset="primary" aria-label="Remove" @click="emits('remove')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NetworkLogo from '../../network-logo/NetworkLogo.vue'
import { Network } from '../../types'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emits = defineEmits(['edit', 'remove', 'bind'])

defineProps<{
  network: Network
}>()
</script>
