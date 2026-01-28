<template>
  <VaAvatar size="large" color="warning"><span class="text-4xl"> U </span></VaAvatar>
  <div class="flex flex-col justify-center">
    <div class="flex space-x-1 text-[13px] leading-4">
      <p>CMI Uid:</p>
    </div>
    <h2 class="text-[28px] md:text-[32px] leading-10 font-bold">{{ store.uid }}</h2>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '../../../stores/user-store'

const store = useUserStore()
store.fetchUserPreference()
</script>
