<script setup lang="ts">
import { useNetworkConfig } from './composables/useNetworkConfig'
import ConfigTable from './widgets/config/ConfigTable.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { list, isLoading } = useNetworkConfig()
</script>

<template>
  <h1 class="page-title">{{ t('network.networks') }}</h1>

  <VaCard>
    <VaCardContent>
      <ConfigTable :list="list" :loading="isLoading" />
    </VaCardContent>
  </VaCard>
</template>
