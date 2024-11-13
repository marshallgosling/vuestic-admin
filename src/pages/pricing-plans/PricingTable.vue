<script setup lang="ts">
import { computed, ref } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { useInstancePricesStore } from '../../stores/price-store'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const pricingStore = useInstancePricesStore()
pricingStore.load()
const pricingList = computed(() => pricingStore.all)
const isLoading = ref(pricingStore.loading)

const columns = defineVaDataTableColumns([
  { label: t('pricing.name'), key: 'name', sortable: true },
  { label: t('pricing.description'), key: 'description', sortable: true },
  { label: t('pricing.price'), key: 'price', sortable: true },
])
</script>

<template>
  <div>
    <VaDataTable :items="pricingList" :columns="columns" :loading="isLoading">
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
          {{ pricingStore.currency }} {{ instance.price }} / {{ t('pricing.month') }}
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
