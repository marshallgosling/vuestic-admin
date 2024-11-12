<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EmptyKeyPair, KeyPair } from '../types'
import { SelectOption } from 'vuestic-ui'

const props = defineProps<{
  keypair: KeyPair | null
  saveButtonLabel: string
}>()

defineEmits<{
  (event: 'save', keypair: KeyPair): void
  (event: 'close'): void
}>()

const defaultNewKeyPair: EmptyKeyPair = {
  name: '',
}

const newKeyPair = ref({ ...defaultNewKeyPair })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newKeyPair.value).some((key) => {
    // if (key === 'team') {
    //   return false
    // }

    return (
      newKeyPair.value[key as keyof EmptyKeyPair] !== (props.keypair ?? defaultNewKeyPair)?.[key as keyof EmptyKeyPair]
    )
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
  () => props.keypair,
  () => {
    if (!props.keypair) {
      return
    }

    newKeyPair.value = {
      ...props.keypair,
      name: props.keypair.name,
    }
  },
  { immediate: true },
)

const required = (v: string | SelectOption) => !!v || '必填项'
</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput v-model="newKeyPair.name" label="名称" :rules="[required]" />

    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')">取消</VaButton>
      <VaButton @click="validate() && $emit('save', newKeyPair as KeyPair)">{{ saveButtonLabel }}</VaButton>
    </div>
  </VaForm>
</template>

<style lang="scss" scoped>
.va-select-content__autocomplete {
  flex: 1;
}

.va-input-wrapper__text {
  gap: 0.2rem;
}
</style>
