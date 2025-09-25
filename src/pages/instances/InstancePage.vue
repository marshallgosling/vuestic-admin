<template>
  <h1 class="page-title">
    {{ instance?.name }} <small>{{ t('instance.information') }}</small>
  </h1>

  <VaSkeletonGroup v-if="isLoading">
    <VaSkeleton class="mb-4" height="160px" variant="squared" />
    <VaSkeleton class="mb-4" height="160px" variant="squared" />
    <VaSkeleton height="360px" variant="squared" />
  </VaSkeletonGroup>

  <template v-else>
    <InstanceInfo :instance="instance" :is-ready="!isLoading" :price-list="pricingList" />
    <InstanceMetadata :metadata="metadata" :is-ready="!isLoading" />
    <Storage :storage-list="instance?.storages" />
    <Security :security-list="instance?.securities" />
    <Billing v-if="userType == 1" :billing-list="instance?.billings" :currency="currency" />
    <Logs :logs-list="instance?.logs" />
  </template>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import Security from './widgets/Security.vue'
import { useInstance } from './composables/useInstance'
import { computed } from 'vue'
import InstanceInfo from './widgets/InstanceInfo.vue'
import InstanceMetadata from './widgets/InstanceMetadata.vue'
import { useInstancePricesStore } from '../../stores/price-store'
import Billing from './widgets/Billing.vue'
import Logs from './widgets/Logs.vue'
import Storage from './widgets/Storage.vue'
const { t } = useI18n()
const route = useRoute()

const { instance, metadata, isLoading } = useInstance(route.params['id'] as string)
const pricingStore = useInstancePricesStore()
pricingStore.load()
const pricingList = computed(() => pricingStore.all)
const currency = '$'
const userType = computed(() => parseInt(localStorage.getItem('type') ?? '1') ?? 1)
</script>
