<template>
  <VaModal hide-default-actions model-value size="small" close-button @cancel="emits('close')">
    <h3 class="va-h4 mb-4">{{ t('billing.edit_payment_card') }}</h3>
    <PaymentCardEdit
      :payment-card="paymentCard"
      :submit-text="t('billing.save_card')"
      @cancel="emits('close')"
      @save="updateCard"
    />
  </VaModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PaymentCardEdit from './PaymentCardEdit.vue'
import { PaymentCard } from '../../types'
import { usePaymentCardsStore } from '../../../../stores/payment-cards'
import { useToast } from 'vuestic-ui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const isModalOpen = ref(false)
const { init } = useToast()

const props = defineProps<{
  paymentCard: PaymentCard
}>()

const emits = defineEmits(['close'])
const store = usePaymentCardsStore()
const paymentCard = ref({ ...props.paymentCard })

const updateCard = (card: PaymentCard) => {
  isModalOpen.value = false
  store.update(card)
  init({ message: "You've successfully updated a payment card", color: 'success' })
  emits('close')
}
</script>
