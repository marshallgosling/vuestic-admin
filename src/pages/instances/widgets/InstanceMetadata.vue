<template>
  <VaCard class="mb-6">
    <VaCardContent v-if="isReady">
      <h3 class="page-sub-title mb-6">
        {{ t('instance.metadata') }}
      </h3>
      <div class="flex items-center gap-2 md:h-12">
        <VaCard>
          <VaCardContent class="flex flex-col md:w-48 md:items-center">
            <div class="flex-col">
              <p class="mb-1">{{ t('metadata.name') }}</p>
              <p class="font-bold">
                {{ metadata.name }}
              </p>
            </div>
          </VaCardContent>
        </VaCard>
        <VaDivider class="md:h-12" vertical />
        <VaCard>
          <VaCardContent class="flex flex-col md:w-48 md:items-center">
            <div class="flex-col">
              <p class="mb-1">{{ t('metadata.profile') }}</p>
              <p class="font-bold">
                {{ metadata.profile ?? '-' }}
              </p>
            </div>
          </VaCardContent>
        </VaCard>
        <VaDivider class="md:h-12" vertical />
        <VaCard>
          <VaCardContent class="flex flex-col md:w-48 md:items-center">
            <div class="flex-col">
              <p class="mb-1">{{ t('metadata.cluster') }}</p>
              <p class="font-bold">
                {{ metadata.cluster ?? '-' }}
              </p>
            </div>
          </VaCardContent>
        </VaCard>
        <VaDivider class="md:h-12" vertical />
        <VaCard>
          <VaCardContent class="flex flex-col md:w-48 md:items-center">
            <div class="flex-col">
              <p class="mb-1">{{ t('metadata.status') }}</p>
              <p class="font-bold">
                {{ metadata.status ?? '-' }}
              </p>
            </div>
          </VaCardContent>
        </VaCard>
        <VaDivider class="md:h-12" vertical />
        <VaCard>
          <VaCardContent class="flex flex-col md:w-48 md:items-center">
            <div class="flex-col">
              <p class="mb-1">{{ t('metadata.createdAt') }}</p>
              {{ metadata.created_at ?? '-' }}
            </div>
          </VaCardContent>
        </VaCard>
      </div>
    </VaCardContent>
  </VaCard>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title mb-2">{{ t('service.list') }}</h2>
      <div class="flex items-center mt-2 justify-between md:justify-items-stretch mb-1">
        <div class="flex items-center w-24 font-bold">
          {{ t('service.name') }}
        </div>
        <div class="w-24 font-bold">
          {{ t('service.type') }}
        </div>
        <div class="w-12 font-bold">
          {{ t('service.status') }}
        </div>
        <div class="w-96 font-bold">
          {{ t('service.model') }}
        </div>
        <div class="w-64 font-bold">
          {{ t('service.api_key') }}
        </div>
        <div class="w-20"></div>
      </div>
      <VaDivider />
      <template v-for="(item, index) in metadata.services" :key="item.id">
        <div class="flex items-center justify-between md:justify-items-stretch">
          <div class="flex items-center w-24">
            {{ item.name }}
          </div>
          <div class="w-24">{{ item.service_type }}</div>
          <div class="w-12">{{ item.status }}</div>
          <div class="w-96">{{ item.model }}</div>
          <div class="w-64">{{ item.api_key }}</div>
          <div class="w-20"></div>
        </div>
        <VaDivider v-if="metadata.services && index !== metadata.services.length - 1" />
      </template>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { Metadata } from '../types'

const { t } = useI18n()

defineProps({
  metadata: {
    type: Object as PropType<Metadata>,
    required: true,
  },
  isReady: {
    type: Boolean,
    required: true,
  },
})
</script>
