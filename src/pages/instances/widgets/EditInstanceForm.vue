<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EmptyInstance, Instance } from '../types'
import { SelectOption } from 'vuestic-ui'
import { useI18n } from 'vue-i18n'
import { InstancePrice } from '../../pricing-plans/types'

const props = defineProps<{
  instance: Instance | null
  prices: InstancePrice[]
  saveButtonLabel: string
}>()

defineEmits<{
  (event: 'save', instance: Instance): void
  (event: 'close'): void
}>()

const { t } = useI18n()

const defaultNewInstance: EmptyInstance = {
  name: '',
  domain: 'AZ1',
  description: '',
  instance_type: 'small',
}

const newInstance = ref({ ...defaultNewInstance })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newInstance.value).some((key) => {
    // if (key === 'team') {
    //   return false
    // }

    return (
      newInstance.value[key as keyof EmptyInstance] !==
      (props.instance ?? defaultNewInstance)?.[key as keyof EmptyInstance]
    )
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
  () => props.instance,
  () => {
    if (!props.instance) {
      return
    }

    newInstance.value = {
      ...props.instance,
      name: props.instance.name,
      domain: props.instance.domain,
      description: props.instance.description,
      instance_type: props.instance.instance_type,
    }
  },
  { immediate: true },
)

const required = (v: string | SelectOption) => !!v || t('rules.required')
const DomainListOptions = [
  {
    label: '区域 A',
    value: 'AZ1',
  },
  {
    label: '区域 B',
    value: 'AZ2',
  },
]
</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaSelect
      v-model="newInstance.instance_type"
      :label="t('instance.type')"
      :rules="[required]"
      :options="props.prices"
      text-by="description"
      value-by="name"
      track-by="name"
    />
    <VaSelect
      v-model="newInstance.domain"
      :label="t('instance.domain')"
      :rules="[required]"
      :options="DomainListOptions"
      text-by="label"
      value-by="value"
      track-by="value"
    />
    <VaInput v-model="newInstance.name" :label="t('instance.name')" />

    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')">{{ t('confirm.close') }}</VaButton>
      <VaButton @click="validate() && $emit('save', newInstance as Instance)">{{ saveButtonLabel }}</VaButton>
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
