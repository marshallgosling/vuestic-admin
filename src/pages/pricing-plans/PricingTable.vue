<script setup lang="ts">
import { defineVaDataTableColumns } from 'vuestic-ui'
import { useI18n } from 'vue-i18n'
import { InstancePrice } from './types'
import { PropType } from 'vue'
const { t } = useI18n()

defineProps({
  pricingList: {
    type: Array as PropType<InstancePrice[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
})

const columns = defineVaDataTableColumns([
  { label: t('pricing.name'), key: 'name', sortable: true },
  { label: t('pricing.description'), key: 'description', sortable: true },
  { label: t('pricing.price'), key: 'price', sortable: true },
])
</script>

<template>
  <div>
    <VaDataTable :items="pricingList" :columns="columns" :loading="loading">
      <template #cell(name)="{ rowData: instance }">
        <div class="flex items-center gap-2 ellipsis max-w-[100px]">
          {{ instance.name.toUpperCase() }}
        </div>
      </template>
      <template #cell(description)="{ rowData: instance }">
        <div class="flex items-center gap-2 ellipsis">
          {{ instance.description }}
        </div>
      </template>
      <template #cell(price)="{ rowData: instance }">
        <div class="flex items-center gap-2 ellipsis max-w-[120px]">
          {{ currency }} {{ instance.price }} / {{ t('pricing.' + instance.payment) }}
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
