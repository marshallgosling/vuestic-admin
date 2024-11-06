<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EmptyInstance, Instance, InstanceType } from '../types'
import { SelectOption } from 'vuestic-ui'


const props = defineProps<{
  instance: Instance | null
  saveButtonLabel: string
}>()

defineEmits<{
  (event: 'save', intance: Instance): void
  (event: 'close'): void
}>()

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
      newInstance.value[key as keyof EmptyInstance] !== (props.instance ?? defaultNewInstance)?.[key as keyof EmptyInstance]
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

const required = (v: string | SelectOption) => !!v || '必填项'
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
const InstanceTypeOptions = [
  {
    label: 'NVIDIA H800, vCPUs:104,RAM:900  GiB,STORAGE:11 TiB SSD',
    value: 'small',
  },
  {
    label: 'NVIDIA H800, vCPUs:208,RAM:1800 GiB,STORAGE:22 TiB SSD',
    value: 'medium',
  },
]
</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput v-model="newInstance.name" label="实例名称" :rules="[required]" />
    <VaInput v-model="newInstance.description" label="描述"  />
    <VaSelect v-model="newInstance.domain" label="域" :rules="[required]" :options="DomainListOptions" text-by="label" value-by="value" track-by="value" />
    <VaSelect v-model="newInstance.instance_type" label="实例类型" :rules="[required]" :options="InstanceTypeOptions" text-by="label" value-by="value" track-by="value" />
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')">取消</VaButton>
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
