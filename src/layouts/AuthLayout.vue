<template>
  <VaLayout v-if="breakpoint.lgUp" class="h-screen bg-[var(--va-background-secondary)]">
    <template #left>
      <RouterLink
        class="bg-console h-full flex items-center justify-center"
        style="width: 45vw"
        to="/"
        aria-label="Visit homepage"
      >
        <div
          style="width: 376px; height: 119px; background: url(/console/mcloud_logo.png) no-repeat; background-size: cover"
        ></div>
      </RouterLink>
    </template>
    <template #content>
      <main class="h-full flex items-center justify-center mx-auto max-w-[420px]">
        <RouterView />
      </main>
    </template>
  </VaLayout>

  <VaLayout v-else class="h-screen bg-[var(--va-background-secondary)]">
    <template #content>
      <div class="p-4">
        <main class="h-full flex flex-row items-center justify-start mx-auto max-w-[420px]">
          <div class="flex flex-col items-start">
            <RouterLink class="py-4" to="/" aria-label="Visit homepage">
              <CenturyLogo class="mb-2" start="#0E41C9" />
            </RouterLink>
            <RouterView />
          </div>
        </main>
      </div>
    </template>
  </VaLayout>
</template>

<script lang="ts" setup>
import { useBreakpoint } from 'vuestic-ui'
import CenturyLogo from '../components/CenturyLogo.vue'

const breakpoint = useBreakpoint()
</script>
