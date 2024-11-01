<script setup lang="ts">
import { PropType } from 'vue'
import { Instance } from '../types'
import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'

defineProps({
  instances: {
    type: Array as PropType<Instance[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

defineEmits<{
  (event: 'edit', instance: Instance): void
  (event: 'delete', instance: Instance): void
  (event: 'start', instance: Instance): void
  (event: 'stop', instance: Instance): void
  (event: 'reboot', instance: Instance): void
}>()

const avatarColor = (userName: string) => {
  const colors = ['primary', '#FFD43A', '#ADFF00', '#262824', 'danger']
  const index = userName.charCodeAt(0) % colors.length
  return colors[index]
}
</script>

<template>
  <VaInnerLoading
    v-if="instances.length > 0 || loading"
    :loading="loading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[4rem]"
  >
    <VaCard
      v-for="instance in instances"
      :key="instance.id"
      :style="{ '--va-card-outlined-border': '1px solid var(--va-background-element)' }"
      outlined
    >
      <VaCardContent class="flex flex-col h-full">
        <div class="text-[var(--va-secondary)]">{{ instance.created_at }}</div>
        <div class="flex flex-col items-center gap-4 grow">
          <h4 class="va-h4 text-center self-stretch overflow-hidden line-clamp-2 text-ellipsis">
            {{ instance.name }}
          </h4>
          <p>
            <span class="text-[var(--va-secondary)]">域: </span>
            <span>{{ instance.domain }}</span>
          </p>
          <p>
            <span class="text-[var(--va-secondary)]">描述: </span>
            <span>{{ instance.description }}</span>
          </p>
          
          <ProjectStatusBadge :status="instance.status" />
        </div>
        <VaDivider class="my-6" />
        <div class="flex justify-between">
          <VaButton preset="secondary" icon="mso-edit" color="secondary" @click="$emit('edit', instance)" />
          <VaButton preset="secondary" icon="mso-delete" color="danger" @click="$emit('delete', instance)" />
          <VaButton preset="secondary" icon="mso-delete" color="danger" @click="$emit('start', instance)" />
          <VaButton preset="secondary" icon="mso-delete" color="danger" @click="$emit('stop', instance)" />
          <VaButton preset="secondary" icon="mso-delete" color="danger" @click="$emit('reboot', instance)" />
        </div>
      </VaCardContent>
    </VaCard>
  </VaInnerLoading>
  <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">没有任何实例</div>
</template>
