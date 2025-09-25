<script setup lang="ts">
import { useStorage } from './composables/useStorage'
import StorageTable from './widgets/StorageTable.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { storages, isLoading, pagination } = useStorage()
</script>

<template>
  <h1 class="page-title">{{ t('storage.block') }}</h1>

  <VaCard>
    <VaCardContent>
      <StorageTable :storages="storages" :loading="isLoading" :pagination="pagination" />
    </VaCardContent>
  </VaCard>
</template>
