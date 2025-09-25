<script setup lang="ts">
import { useStorageConfig } from './composables/useStorageConfig'
import ConfigTable from './widgets/ConfigTable.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { list, isLoading } = useStorageConfig()
</script>

<template>
  <h1 class="page-title">{{ t('storage.configs') }}</h1>

  <VaCard>
    <VaCardContent>
      <ConfigTable :list="list" :loading="isLoading" />
    </VaCardContent>
  </VaCard>
</template>
