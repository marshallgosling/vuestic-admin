<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title mb-2">{{ t('instance.logs') }}</h2>
      <div class="flex items-center mt-2 justify-between md:justify-items-stretch mb-1">
        <div class="flex items-center w-20 font-bold">
          {{ t('logs.name') }}
        </div>
        <div class="w-48 font-bold">
          {{ t('logs.flag') }}
        </div>
        <div class="w-40 font-bold">
          {{ t('logs.created_at') }}
        </div>
        <div class="w-40 font-bold">
          {{ t('logs.results') }}
        </div>
      </div>
      <VaDivider />
      <template v-for="(item, index) in logsList" :key="item.id">
        <div class="flex items-center justify-between md:justify-items-stretch">
          <div class="flex items-center w-20">
            {{ item.name }}
          </div>
          <div class="w-48">{{ item.flag }}</div>
          <div class="w-40">{{ item.created_at }}</div>
          <div class="w-40"></div>
        </div>
        <VaDivider v-if="index !== logsList.length - 1" />
      </template>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { Log } from '../types'

const { t } = useI18n()

defineProps({
  logsList: {
    type: Array as PropType<Log[]>,
    required: true,
  },
})
</script>
