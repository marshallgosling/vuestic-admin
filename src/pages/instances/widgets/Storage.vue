<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title mb-2">{{ t('storage.block') }}</h2>
      <div class="flex items-center mt-2 justify-between md:justify-items-stretch mb-1">
        <div class="flex items-center w-48 font-bold">
          {{ t('storage.name') }}
        </div>
        <div class="w-20 font-bold">
          {{ t('storage.amount') }}
        </div>
        <div class="w-20 font-bold">
          {{ t('storage.status') }}
        </div>
        <div class="w-48 font-bold">
          {{ t('storage.description') }}
        </div>
      </div>
      <VaDivider />
      <template v-for="(item, index) in storageList" :key="item.id">
        <div class="flex items-center justify-between md:justify-items-stretch">
          <div class="flex items-center w-48">
            {{ item.name }}
          </div>
          <div class="w-20">{{ item.amount }}</div>
          <div class="w-20"><StorageStatusBadge :status="item.status" /></div>
          <div class="w-48">{{ item.description }}</div>
        </div>
        <VaDivider v-if="storageList && index !== storageList.length - 1" />
      </template>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { Storage } from '../../storages/types'
import StorageStatusBadge from '../components/StorageStatusBadge.vue'

defineProps({
  storageList: {
    type: Array as PropType<Storage[] | undefined>,
    required: true,
  },
})
const { t } = useI18n()

defineEmits<{
  (event: 'delete', security: Storage): void
}>()
</script>
