<script setup lang="ts">
import { useNetworkStaticIp } from './composables/useNetworkStaticIp'
import StaticIpTable from './widgets/static-ip/StaticIpTable.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { list, isLoading } = useNetworkStaticIp()
</script>

<template>
  <h1 class="page-title">{{ t('network.static_ip_list') }}</h1>

  <VaCard>
    <VaCardContent>
      <StaticIpTable :list="list" :loading="isLoading" />
    </VaCardContent>
  </VaCard>
</template>
