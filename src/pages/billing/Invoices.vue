<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title">{{ t('billing.invoices') }}</h2>
      <div class="flex items-center mt-2 justify-between md:justify-items-stretch mb-1">
        <div class="flex items-center w-48 font-bold">
          {{ t('billing.month') }}
        </div>
        <div class="w-20 font-bold">
          {{ t('billing.amount') }}
        </div>
        <div class="w-20 font-bold">
          {{ t('billing.tax') }}
        </div>
        <div class="w-20 font-bold">
          {{ t('billing.tax_amount') }}
        </div>
        <div class="w-20"></div>
      </div>

      <template v-for="(item, index) in paymentInvoices" :key="item.id">
        <div class="flex items-center justify-between md:justify-items-stretch">
          <div class="flex items-center w-48">
            {{ item.name }}
          </div>
          <div class="w-20">{{ currency }} {{ item.amount }}</div>
          <div class="w-20">{{ item.tax }} %</div>
          <div class="w-20">{{ currency }} {{ item.tax_amount }}</div>
          <div class="w-20">
            <VaButton preset="primary" size="small" @click="download">{{ t('billing.download') }}</VaButton>
          </div>
        </div>
        <VaDivider v-if="index !== paymentInvoices.length - 1" />
      </template>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useToast } from 'vuestic-ui'
import { useI18n } from 'vue-i18n'
import { usePaymentInvoicesStore } from '../../stores/invoice-store'

const { init } = useToast()
const { t } = useI18n()

const invoiceStore = usePaymentInvoicesStore()

const paymentInvoices = computed(() => invoiceStore.allInvoices)
const currency = ref(invoiceStore.currency)

const download = () => {
  init({
    message: "Request received. We'll email your invoice once we've completed data collection.",
    color: 'success',
  })
}
</script>
