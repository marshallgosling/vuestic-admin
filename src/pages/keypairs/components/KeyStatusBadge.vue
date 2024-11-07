<script setup lang="ts">
import { KeyPair } from '../types'

defineProps({
  status: {
    type: Number,
    required: true,
  },
})

const badgeColorMap: Record<KeyPair['status'], string> = {
  0: 'primary',
  1: 'success',
}

const statusStringMap: Record<KeyPair['status'], string> = {
  0: '未使用',
  1: '使用中',
}
</script>

<template>
  <VaBadge square :color="badgeColorMap[$props.status]" :text="statusStringMap[$props.status]" />
</template>
