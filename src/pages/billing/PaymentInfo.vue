<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title mb-2">{{ t('billing.payment_info') }}</h2>

      <div class="flex items-center justify-between md:justify-items-stretch">
        <div
          class="flex grow flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-1 justify-between items-start md:items-center"
        >
          <div class="md:w-48">
            <p class="mb-1">{{ t('billing.payment_amount') }}</p>
            <p class="font-bold">
              {{ invoices.length > 0 ? invoices[0].name + ':     ' + currency + invoices[0].amount : '-' }}
            </p>
          </div>
        </div>
      </div>

      <template v-if="paymentCard">
        <VaDivider />

        <div class="flex items-center justify-between md:justify-items-stretch">
          <div
            class="flex grow flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-1 justify-between items-start md:items-center"
          >
            <div class="md:w-48">
              <p class="mb-1">{{ t('billing.payment_method') }}</p>
              <p class="font-bold capitalize">{{ paymentCard.paymentSystem }} {{ paymentCard.cardNumberMasked }}</p>
            </div>
          </div>
          <div class="md:w-48 flex justify-end">
            <VaButton :to="{ name: 'payment-methods' }" preset="primary">{{ t('billing.payment_cards') }}</VaButton>
          </div>
        </div>
      </template>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { usePaymentCardsStore } from '../../stores/payment-cards'
import { useI18n } from 'vue-i18n'
import { Invoice } from './types'

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

const cardStore = usePaymentCardsStore()
const { t } = useI18n()

const paymentCard = computed(() => cardStore.currentPaymentCard)
</script>
