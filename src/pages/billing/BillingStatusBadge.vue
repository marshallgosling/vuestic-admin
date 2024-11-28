<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const StatusStringMap = ['billing.unpaid', 'billing.paid']

const StatusColorMap = ['primary', 'success']

defineProps({
  status: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <VaBadge square :color="StatusColorMap[$props.status]" :text="t(StatusStringMap[$props.status])" />
</template>
