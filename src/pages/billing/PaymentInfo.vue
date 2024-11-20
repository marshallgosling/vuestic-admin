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
              {{ paymentPlan.isYearly ? paymentPlan.priceYear : paymentPlan.priceMonth }}&nbsp;/{{
                paymentPlan.isYearly ? 'yearly' : 'monthly'
              }}
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

  <ChangeYourPaymentPlan
    v-if="isChangeYourPaymentPlanModalOpen"
    :yearly-plan="paymentPlan.isYearly"
    @confirm="updatePaymentPlan"
    @cancel="togglePaymentPlanModal"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { usePaymentCardsStore } from '../../stores/payment-cards'
import { useI18n } from 'vue-i18n'
import ChangeYourPaymentPlan from './modals/ChangeYourPaymentPlan.vue'

const paymentPlan = ref({
  id: '1',
  name: 'Gold',
  isYearly: false,
  type: 'current',
  padletsUsed: 19,
  padletsTotal: '20',
  priceMonth: '$6.99',
  priceYear: '$69.99',
  switchToYearlySave: '16%',
  uploadLimit: '100MB',
})

const cardStore = usePaymentCardsStore()
const { t } = useI18n()
const isChangeYourPaymentPlanModalOpen = ref(false)

const paymentCard = computed(() => cardStore.currentPaymentCard)
const togglePaymentPlanModal = () => {
  isChangeYourPaymentPlanModalOpen.value = !isChangeYourPaymentPlanModalOpen.value
}

const updatePaymentPlan = () => {
  paymentPlan.value.isYearly = !paymentPlan.value.isYearly
  isChangeYourPaymentPlanModalOpen.value = false
}
</script>
