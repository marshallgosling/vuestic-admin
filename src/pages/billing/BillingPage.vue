<template>
  <h1 class="page-title">{{ t('billing.information') }}</h1>

  <VaSkeletonGroup v-if="cardStore.loading && invoicesStore.loading">
    <VaSkeleton class="mb-4" height="160px" variant="squared" />
    <VaSkeleton class="mb-4" height="160px" variant="squared" />
    <VaSkeleton height="360px" variant="squared" />
  </VaSkeletonGroup>

  <template v-else>
    <PaymentInfo />
    <Invoices />
  </template>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import PaymentInfo from './PaymentInfo.vue'
import { usePaymentCardsStore } from '../../stores/payment-cards'
import { usePaymentInvoicesStore } from '../../stores/invoice-store'
import Invoices from './Invoices.vue'
const { t } = useI18n()
const cardStore = usePaymentCardsStore()
cardStore.load()

const invoicesStore = usePaymentInvoicesStore()
invoicesStore.load()
</script>
