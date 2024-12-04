<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title mb-2">{{ t('billing.invoices') }}</h2>
      <div class="flex items-center mt-2 justify-between md:justify-items-stretch mb-1">
        <div class="flex items-center w-24 font-bold">
          {{ t('billing.month') }}
        </div>
        <div class="w-56 font-bold">
          {{ t('billing.amount') }}
        </div>

        <div class="w-24 font-bold">
          {{ t('billing.status') }}
        </div>
        <div class="w-20"></div>
      </div>
      <VaDivider />
      <template v-for="(item, index) in invoices" :key="item.id">
        <div class="flex items-center justify-between md:justify-items-stretch">
          <div class="flex items-center w-24">
            {{ item.name }}
          </div>
          <div class="w-56">{{ currency }} {{ item.amount }}</div>

          <div class="w-24">
            <BillingStatusBadge :status="item.status" />
          </div>
          <div class="w-20">
            <VaButton preset="primary" size="small" @click="download">{{ t('billing.download') }}</VaButton>
          </div>
        </div>
        <VaDivider v-if="index !== invoices.length - 1" />
      </template>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useToast } from 'vuestic-ui'
import { useI18n } from 'vue-i18n'
import BillingStatusBadge from './BillingStatusBadge.vue'
import { Invoice } from './types'

const { init } = useToast()
const { t } = useI18n()

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

const download = () => {
  init({
    message: "Request received. We'll email your invoice once we've completed data collection.",
    color: 'success',
  })
}
</script>
