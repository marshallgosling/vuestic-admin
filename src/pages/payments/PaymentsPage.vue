<template>
  <h1 class="page-title">{{ t('billing.payment_method') }}</h1>

  <VaCard class="mb-6">
    <VaCardContent>
      <div class="text-2xl font-bold leading-5 mb-6">{{ t('billing.payment_cards') }}</div>

      <PaymentCardList />
    </VaCardContent>
  </VaCard>

  <!-- <VaCard class="mb-6">
    <VaCardContent>
      <div class="text-2xl font-bold leading-5 mb-6">{{ t('billing.address') }}</div>

      <BillingAddressList />

      <div class="space-y-2 mt-6">
        <div class="text-lg font-bold mb-2">Tax location</div>
        <div class="space-y-1">
          <div class="text-sm text-gray-500">United States - 10% VAT</div>
          <div class="text-sm text-primary underline">More info</div>
        </div>
      </div>
    </VaCardContent>
  </VaCard> -->
</template>

<script lang="ts" setup>
import PaymentCardList from './widgets/my-cards/PaymentCardList.vue'
// import BillingAddressList from './widgets/billing-address/BillingAddressList.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
