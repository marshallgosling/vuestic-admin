<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title mb-2">{{ t('billing.invoiceDetails') }}</h2>

      <VaTabs v-model="month">
        <template #tabs>
          <VaTab v-for="tab in invoices" :key="tab.name" :name="tab.name">
            {{ tab.name }}
          </VaTab>
        </template>
      </VaTabs>

      <VaCard v-for="invoice in invoices" :key="invoice.id">
        <VaCardContent v-if="month == invoice.name">
          <div class="flex items-center mt-2 justify-between md:justify-items-stretch mb-1">
            <div class="flex items-center w-12 font-bold">
              {{ t('billing.name') }}
            </div>
            <div class="w-96 font-bold">
              {{ t('billing.description') }}
            </div>
            <div class="w-20 font-bold">
              {{ t('billing.quantity') }}
            </div>
            <div class="w-40 font-bold">
              {{ t('billing.duration') }}
            </div>
            <div class="w-20 font-bold">
              {{ t('billing.price') }}
            </div>
            <div class="w-40 font-bold">
              {{ t('billing.amount') }}
            </div>
          </div>
          <VaDivider />
          <template v-for="(item, index) in invoice?.items" :key="item.id">
            <div class="flex items-center justify-between md:justify-items-stretch">
              <div class="flex items-center w-12">
                {{ t('billing.' + item.name) }}
              </div>

              <div class="w-96">{{ item.description }}</div>
              <div class="w-20">{{ item.quantity }}</div>
              <div class="w-40">{{ item.duration }}</div>
              <div class="w-20">{{ currency }} {{ item.price }}</div>
              <div class="w-40">{{ currency }} {{ item.amount }}</div>
            </div>
            <VaDivider v-if="invoice && index !== invoice?.items.length - 1" />
          </template>
        </VaCardContent>
      </VaCard>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Invoice } from './types'
import { usePaymentInvoicesStore } from '../../stores/invoice-store'

const { t } = useI18n()

const invoiceStore = usePaymentInvoicesStore()

defineProps({
  invoices: {
    type: Array as PropType<Invoice[]>,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
})

const month = ref(invoiceStore.month)
</script>
