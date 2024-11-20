<template>
  <VaModal hide-default-actions model-value size="small" close-button @cancel="emits('close')">
    <h3 class="va-h4 mb-4">{{ t('network.delete_static_ip') }}</h3>
    <VaAlert color="#fdeae7" text-color="#940909">
      {{ t('network.delete_alert') }}
    </VaAlert>

    <div class="flex justify-end gap-3">
      <VaButton color="secondary" preset="secondary" @click="emits('close')">{{ t('vuestic.cancel') }}</VaButton>
      <VaButton color="danger" @click="emits('delete')">{{ t('network.delete') }}</VaButton>
    </div>
  </VaModal>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emits = defineEmits(['close', 'delete'])
</script>
