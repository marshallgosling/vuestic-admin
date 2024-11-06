<script setup lang="ts">
import { PropType } from 'vue'
import { Instance } from '../types'
import InstanceStatusBadge from '../components/InstanceStatusBadge.vue'

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
        <div class="flex flex-col gap-1 grow">
          <h4 class="va-h4 text-left self-stretch overflow-hidden line-clamp-2 text-ellipsis">
            {{ instance.name }}
          </h4>
        </div>
        <div class="grid grid-cols-3 gap-4 ">
          <VaImage fit="contain" class="max-h-32 col-span-1 pd-1" src="http://localhost:8080/front/instance-small.png"/>

          <div class="flex flex-col gap-1 grow col-span-2">
            <p>
              <span class="text-[var(--va-secondary)]">域: </span>
              <span>{{ instance.domain }}</span>
            </p>
            <p>
              <span class="text-[var(--va-secondary)]">描述: </span>
              <span>{{ instance.description }}</span>
            </p>
            <p>
              <span class="text-[var(--va-secondary)]">IP: </span>
              <span>{{ instance.networks[0].ip }}</span>
            </p>
            <p>&nbsp;</p>
            <InstanceStatusBadge :status="instance.status" />
          </div>
        </div>

        <VaDivider class="my-2" />
        <div class="flex justify-right gap-2">
          
          <VaButton preset="secondary" icon="mso-edit" color="primary" size="small" @click="$emit('edit', instance)" >修改</VaButton>
          <VaButton preset="secondary" icon="mso-delete" color="danger" size="small" @click="$emit('delete', instance)" >删除</VaButton>

            <VaButton preset="secondary" icon="mso-play_arrow" color="primary" size="small" @click="$emit('start', instance)">启动</VaButton>
            <VaButton preset="secondary" icon="mso-highlight_keyboard_focus" color="primary" size="small" @click="$emit('stop', instance)" >停止</VaButton>
            <VaButton preset="secondary" icon="mso-forward_media" color="primary" size="small" @click="$emit('reboot', instance)" >重启</VaButton>

        </div>
      </VaCardContent>

    </VaCard>
  </VaInnerLoading>
  <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">没有任何实例</div>
</template>
