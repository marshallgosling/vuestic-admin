<template>
  <h1 class="page-title">{{ t('pricing.title') }}</h1>

  <div class="flex flex-col p-4 bg-backgroundSecondary">
    <PricingTable :currency="pricingStore.currency" :pricing-list="pricingList" :loading="isLoading" />
  </div>

  <div class="py-4 text-sm leading-[26px]">
    {{ t('pricing.help') }}
    <span class="text-primary underline">{{ t('pricing.guidelines') }}</span
    >.
  </div>
</template>
<script lang="ts" setup>
import PricingTable from './PricingTable.vue'
import { useInstancePricesStore } from '../../stores/price-store'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const pricingStore = useInstancePricesStore()
pricingStore.load()
const pricingList = computed(() => pricingStore.all)
const isLoading = computed(() => pricingStore.loading)
</script>
