<script setup lang="ts">
import { StatusStringMap, StatusColorMap } from '../types'

defineProps({
  status: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <VaBadge square :color="StatusColorMap[$props.status]" :text="StatusStringMap[$props.status]" />
</template>
