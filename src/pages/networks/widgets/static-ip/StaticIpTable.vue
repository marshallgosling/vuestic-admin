<script setup lang="ts">
import { PropType } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import NetworkStatusBadge from '../NetworkStatusBadge.vue'
import { Network } from '../../types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const columns = defineVaDataTableColumns([
  { label: '名称', key: 'name', sortable: true },
  { label: '类型', key: 'type', sortable: true },
  { label: 'IP', key: 'ip', sortable: false },
  { label: '状态', key: 'status', sortable: true },
  { label: '实例', key: 'instance', sortable: true },
])

defineProps({
  list: {
    type: Array as PropType<Network[]>,
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
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">{{ key.type }}</div>
      </template>
      <template #cell(ip)="{ rowData: key }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">{{ key.ip ?? '-' }}</div>
      </template>

      <template #cell(status)="{ rowData: key }">
        <NetworkStatusBadge :status="key.status" />
      </template>
      <template #cell(instance)="{ rowData: key }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">{{ key.instance_name ?? '-' }}</div>
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
