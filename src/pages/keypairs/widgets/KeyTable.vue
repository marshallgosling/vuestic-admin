<script setup lang="ts">
import { PropType } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { KeyPair } from '../types'
import KeyStatusBadge from '../components/KeyStatusBadge.vue'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true },
  { label: '名称', key: 'name', sortable: true },
  { label: '状态', key: 'status', sortable: true },
  { label: '创建日期', key: 'created_at', sortable: true },
  { label: ' ', key: 'actions' },
])

defineProps({
  keys: {
    type: Array as PropType<KeyPair[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

defineEmits<{
  (event: 'check', instance: KeyPair): void
  (event: 'download', instance: KeyPair): void
  (event: 'delete', instance: KeyPair): void
}>()
</script>

<template>
  <div>
    <VaDataTable :items="keys" :columns="columns" :loading="loading">
      <template #cell(id)="{ rowData: key }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ key.id }}
        </div>
      </template>
      <template #cell(name)="{ rowData: key }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">
          {{ key.name }}
        </div>
      </template>
      <template #cell(status)="{ rowData: key }">
        <KeyStatusBadge :status="key.status" />
      </template>

      <template #cell(actions)="{ rowData: key }">
        <div class="flex gap-2 justify-end">
          <VaButton
            v-if="key.status == 0"
            preset="primary"
            size="small"
            color="primary"
            icon="mso-check"
            aria-label="default"
            @click="$emit('check', key as KeyPair)"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-download"
            color="primary"
            aria-label="Download"
            @click="$emit('download', key as KeyPair)"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete"
            @click="$emit('delete', key as KeyPair)"
          />
        </div>
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
