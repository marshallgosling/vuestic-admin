<template>
  <h1 class="page-title">网络配置列表</h1>

  <VaCard class="mb-6">
    <VaCardContent>
      <div class="text-2xl font-bold leading-5 mb-6">静态IP地址</div>

      <NetworkList />
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import NetworkList from './widgets/static-ip/NetworkList.vue'

</script>
