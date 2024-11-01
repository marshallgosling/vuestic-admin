<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EmptyInstance, Instance } from '../types'
import { SelectOption } from 'vuestic-ui'
import { useUsers } from '../../users/composables/useUsers'
import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'
import UserAvatar from '../../users/widgets/UserAvatar.vue'

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
  domain: undefined,
  description: '',
  status: 'init',
  networks: [],
  storages: [],
  created_at: undefined
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
    }
  },
  { immediate: true },
)

const required = (v: string | SelectOption) => !!v || 'This field is required'

const { users: teamUsers, filters: teamFilters } = useUsers({ pagination: ref({ page: 1, perPage: 100, total: 10 }) })
const { users: ownerUsers, filters: ownerFilters } = useUsers({ pagination: ref({ page: 1, perPage: 100, total: 10 }) })
</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput v-model="newInstance.name" label="实例名称" :rules="[required]" />
    
    
    
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
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
