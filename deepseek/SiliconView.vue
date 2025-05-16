<script setup lang="ts">
import ModelSelector from './components/ModelSelector.vue'
import Chat from './components/Chat.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <h1 class="page-title">{{ t('deepseek.title') }}</h1>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-between">
          <ModelSelector />
        </div>
      </div>

      <Chat />
    </VaCardContent>
  </VaCard>
</template>
