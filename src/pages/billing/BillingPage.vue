<template>
  <h1 class="page-title">{{ t('billing.information') }}</h1>

  <VaSkeletonGroup v-if="invoiceStore.loading">
    <VaSkeleton class="mb-4" height="160px" variant="squared" />
    <VaSkeleton class="mb-4" height="160px" variant="squared" />
    <VaSkeleton height="360px" variant="squared" />
  </VaSkeletonGroup>

  <template v-else>
    <PaymentInfo :invoices="allInvoices" :currency="currency" />
    <InvoiceDetails :invoices="allInvoices" :currency="currency" />
    <Invoices :invoices="allInvoices" :currency="currency" />
  </template>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import PaymentInfo from './PaymentInfo.vue'
import { usePaymentInvoicesStore } from '../../stores/invoice-store'
import InvoiceDetails from './InvoiceDetails.vue'
import Invoices from './Invoices.vue'
import { computed, ref } from 'vue'

const { t } = useI18n()

const invoiceStore = usePaymentInvoicesStore()
invoiceStore.load()

const allInvoices = computed(() => invoiceStore.allInvoices)

const currency = ref(invoiceStore.currency)
</script>
