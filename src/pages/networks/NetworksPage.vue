<template>
  <h1 class="page-title">{{ t('network.networks') }}</h1>

  <VaCard class="mb-6">
    <VaCardContent>
      <div class="text-2xl font-bold leading-5 mb-6">{{ t('network.static_ip_list') }}</div>

      <NetworkList />
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import NetworkList from './widgets/static-ip/NetworkList.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
