<template>
  <div class="w-20 h-12 bg-backgroundElement rounded flex justify-center items-center align-bottom">
    <img v-if="props.type === 'static'" alt="Static IP Logo" src="./static.png" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string
}>()
</script>
