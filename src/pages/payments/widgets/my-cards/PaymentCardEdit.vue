<template>
  <VaForm ref="form" @submit.prevent="submit">
    <VaInput
      v-model="paymentCardLocal.name"
      :rules="[(v) => !!v || t('rules.card_name_required')]"
      class="mb-4"
      :label="t('billing.payment_card_name')"
    />
    <VaCheckbox v-model="paymentCardLocal.isPrimary" class="mb-4" :label="t('billing.is_primary_card')" />
    <VaInput
      v-model="paymentCardLocal.cardHolder"
      :rules="[(v) => !!v || t('rules.card_holder_required')]"
      class="mb-4"
      :label="t('billing.payment_card_holder')"
    />
    <VaSelect
      v-model="paymentCardLocal.paymentSystem"
      :options="paymentSystemTypeOptions"
      :rules="[(v) => !!v || t('rules.payment_system_required')]"
      class="mb-4"
      :label="t('billing.payment_system')"
    />
    <VaInput
      v-model="paymentCardLocal.cardNumber"
      :rules="[(v) => !!v || t('rules.card_name_required')]"
      class="mb-4"
      :label="t('billing.payment_card_number')"
      mask="creditCard"
      placeholder="#### #### #### ####"
    />
    <VaInput
      v-model="paymentCardLocal.expirationDate"
      :mask="{
        date: true,
        datePattern: ['m', 'y'],
      }"
      :rules="[
        (v) => !!v || t('rules.expiration_date_required'),
        (v) => /^\d{4}$/.test(v) || t('rules.expiration_date_format'),
      ]"
      class="mb-4"
      :label="t('billing.payment_card_expires_at')"
    />

    <VaInput
      v-model="paymentCardLocal.cvv"
      type="password"
      :rules="[(v) => !!v || t('rules.cvv_required'), (v) => /^\d{3}$/.test(v) || t('rules.cvv_format')]"
      class="mb-4"
      :label="t('billing.payment_card_cvv')"
    />

    <div class="flex justify-end gap-3">
      <VaButton color="secondary" preset="secondary" @click="emits('cancel')">{{ t('vuestic.cancel') }}</VaButton>
      <VaButton @click="submit">{{ submitText }}</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { useForm } from 'vuestic-ui'
import { PaymentCard, PaymentSystemType } from '../../types'
import { watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { validate } = useForm('form')
const emits = defineEmits(['save', 'cancel'])

const props = defineProps<{
  paymentCard: PaymentCard
  submitText: string
}>()

const paymentSystemTypeOptions = Object.values(PaymentSystemType)
const paymentCardLocal = ref({ ...props.paymentCard })

watch(
  () => props.paymentCard,
  (value) => {
    paymentCardLocal.value = { ...value }
  },
  { deep: true },
)

const submit = () => {
  if (validate()) {
    emits('save', {
      ...paymentCardLocal.value,
      cardNumberMasked: paymentCardLocal.value.cardNumber.replace(/\d{12}(.*)/g, '****$1'),
      cardNumber: paymentCardLocal.value.cardNumber,
    })
  }
}
</script>
