<script setup lang="ts">
import { PropType } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { StorageConfig } from '../types'
import StorageStatusBadge from '../components/StorageStatusBadge.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const columns = defineVaDataTableColumns([
  { label: t('storage.name'), key: 'name', sortable: true },
  { label: t('storage.type'), key: 'type', sortable: true },
  { label: t('storage.network'), key: 'network', sortable: false },
  { label: t('storage.description'), key: 'description', sortable: false },
  { label: t('storage.status'), key: 'status', sortable: true },
])

defineProps({
  list: {
    type: Array as PropType<StorageConfig[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div>
    <VaDataTable :items="list" :columns="columns" :loading="loading" :no-data-html="t('vuestic.noItems')">
      <template #cell(name)="{ rowData: key }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">
          {{ key.name }}
        </div>
      </template>
      <template #cell(type)="{ rowData: key }">
        <div class="flex items-center gap-2 ellipsis max-w-[130px]">{{ key.type }}</div>
      </template>
      <template #cell(network)="{ rowData: key }">
        <div class="flex items-center gap-2 ellipsis max-w-[130px]">{{ key.network?.ip ?? '-' }}</div>
      </template>
      <template #cell(description)="{ rowData: key }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">{{ key.description ?? '-' }}</div>
      </template>
      <template #cell(status)="{ rowData: key }">
        <StorageStatusBadge :status="key.status" />
      </template>
    </VaDataTable>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
