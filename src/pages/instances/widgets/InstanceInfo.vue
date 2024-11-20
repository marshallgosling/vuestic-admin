<template>
  <VaCard class="mb-6">
    <VaCardContent v-if="isReady">
      <h3 class="page-sub-title mb-6">{{ priceList.find(e=>{return e.name == instance.instance_type})?.description }}</h3>

      <div class="flex items-center gap-2 md:h-12">
        <VaCard>
          <VaCardContent class="flex flex-col md:w-48 md:items-center">
            <div class="flex-col">
              <p class="mb-1">{{ t('instance.domain') }}</p>
              <p class="font-bold">
              {{ instance.domain }}
              </p>
            </div>
            
          </VaCardContent>
          
        </VaCard>
        <VaDivider class="md:h-12" vertical />
        <VaCard>
          <VaCardContent class="flex flex-col md:w-48 md:items-center">
            <div class="flex-col">
              <p class="mb-1">{{ t('network.private_ip_list') }}</p>
              <p class="font-bold">
              {{ instance.networks[0]?.ip }}
              </p>
            </div>
            
          </VaCardContent>
          
        </VaCard>
        <VaDivider class="md:h-12" vertical />
        <VaCard>
          <VaCardContent class="flex flex-col md:w-48 md:items-center">
            <div class="flex-col">
              <p class="mb-1">{{ t('network.static_ip_list') }}</p>
              <p class="font-bold">
              {{ instance.networks[1]?.ip }}
              </p>
            </div>
            
          </VaCardContent>
          
        </VaCard>
        <VaDivider class="md:h-12" vertical/>
        <VaCard>
          <VaCardContent class="flex flex-col md:w-48 md:items-center">
            <div class="flex-col">
              <p class="mb-1">{{ t('instance.status') }}</p>
              <InstanceStatusBadge :status="instance.status" />
            </div>
            
          </VaCardContent>
          
        </VaCard>
        <VaDivider class="md:h-12" vertical/>
        <VaCard>
          <VaCardContent class="flex flex-col md:w-48 md:items-center">
            <div class="flex-col">
              <p class="mb-1">{{ t('instance.description') }}</p>
              {{ instance.description }}
            </div>
            
          </VaCardContent>
        </VaCard>
        </div>
    </VaCardContent>
  </VaCard>


</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n'
import { Instance } from '../types';
import { InstancePrice } from '../../pricing-plans/types';
import InstanceStatusBadge from '../components/InstanceStatusBadge.vue'
const { t } = useI18n()

const props = defineProps({
  instance: {
    type: Object as PropType<Instance>,
    required: true,
  },
  isReady: {
    type: Boolean,
    required: true,
  },
  priceList: {
    type: Array as PropType<InstancePrice[]>,
    required: true,
  },
})
</script>
