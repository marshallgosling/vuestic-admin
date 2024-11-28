<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title mb-2">{{ t('security.ipv4') }}</h2>
      <div class="flex items-center mt-2 justify-between md:justify-items-stretch mb-1">
        <div class="flex items-center w-20 font-bold">
          {{ t('security.name') }}
        </div>
        <div class="w-20 font-bold">
          {{ t('security.proto') }}
        </div>
        <div class="w-20 font-bold">
          {{ t('security.port') }}
        </div>
        <div class="w-48 font-bold">
          {{ t('security.help') }}
        </div>
        <div class="w-48"></div>
      </div>
      <VaDivider />
      <template v-for="(item, index) in securityList" :key="item.id">
        <div class="flex items-center justify-between md:justify-items-stretch">
          <div class="flex items-center w-20">
            {{ item.name }}
          </div>
          <div class="w-20">{{ item.proto }}</div>
          <div class="w-20">{{ item.port }}</div>
          <div class="w-48">{{ item.help }}</div>
          <div class="w-48">
            <VaButton color="danger" size="small" @click="$emit('delete', item as Security)">{{
              t('security.delete')
            }}</VaButton>
          </div>
        </div>
        <VaDivider v-if="securityList && index !== securityList.length - 1" />
      </template>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { Security } from '../types'

defineProps({
  securityList: {
    type: Array as PropType<Security[] | undefined>,
    required: true,
  },
})
const { t } = useI18n()

defineEmits<{
  (event: 'delete', security: Security): void
}>()
</script>
