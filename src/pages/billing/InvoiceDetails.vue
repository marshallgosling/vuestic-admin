<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title mb-2">{{ t('billing.invoiceDetails') }}</h2>
      <div class="flex items-center mt-2 justify-between md:justify-items-stretch mb-1">
        <div class="flex items-center w-12 font-bold">
          {{ t('billing.name') }}
        </div>
        <div class="w-96 font-bold">
          {{ t('billing.description') }}
        </div>
        <div class="w-40 font-bold">
          {{ t('billing.quantity') }}
        </div>
        <div class="w-40 font-bold">
          {{ t('billing.amount') }}
        </div>
      </div>
      <VaDivider />
      <template v-for="(item, index) in latestInvoice?.items" :key="item.id">
        <div class="flex items-center justify-between md:justify-items-stretch">
          <div class="flex items-center w-12">
            {{ t('billing.' + item.name) }}
          </div>

          <div class="w-96">{{ item.description }}</div>
          <div class="w-40">{{ item.duration }}</div>
          <div class="w-40">{{ currency }} {{ item.amount }}</div>
        </div>
        <VaDivider v-if="latestInvoice && index !== latestInvoice?.items.length - 1" />
      </template>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePaymentInvoicesStore } from '../../stores/invoice-store'

const { t } = useI18n()

const invoiceStore = usePaymentInvoicesStore()

const latestInvoice = computed(() => invoiceStore.latestInvoice)
const currency = ref(invoiceStore.currency)
</script>
