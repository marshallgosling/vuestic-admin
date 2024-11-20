<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title mb-2">{{ t('instance.billing') }}</h2>
      <div class="flex items-center mt-2 justify-between md:justify-items-stretch mb-1">
        <div class="flex items-center w-48 font-bold">
          {{ t('billing.month') }}
        </div>
        <div class="w-20 font-bold">
          {{ t('billing.amount') }}
        </div>
        <div class="w-20 font-bold">
          {{ t('billing.created_at') }}
        </div>
        <div class="w-20">
          {{ t('billing.status') }}
        </div>
      </div>
      <VaDivider />
      <template v-for="(item, index) in billingList" :key="item.id">
        <div class="flex items-center justify-between md:justify-items-stretch">
          <div class="flex items-center w-48">
            {{ item.name }}
          </div>
          <div class="w-20">{{ currency }} {{ item.amount }}</div>

          <div class="w-20">{{ item.created_at }}</div>
          <div class="w-20">
            <BillingStatusBadge :status="item.status" />
          </div>
        </div>
        <VaDivider v-if="index !== billingList.length - 1" />
      </template>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { Billing } from '../../billing/types'
import BillingStatusBadge from '../components/BillingStatusBadge.vue'

const { t } = useI18n()

defineProps({
  billingList: {
    type: Array as PropType<Billing[]>,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
})
</script>
