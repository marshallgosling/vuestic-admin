<template>
  <VaForm ref="form" @submit.prevent="submit">
    <VaSelect
      v-model="networkLocal.instance_id"
      :options="instanceListOptions"
      :rules="[(v) => !!v || t('rules.required')]"
      class="mb-4"
      :label="t('network.select_instance')"
      text-by="label"
      value-by="value"
      track-by="value"
    />

    <div class="flex justify-end gap-3">
      <VaButton color="secondary" preset="secondary" @click="emits('cancel')">{{ t('confirm.cacel') }}</VaButton>
      <VaButton @click="submit">{{ submitText }}</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { useForm } from 'vuestic-ui'
import { Network } from '../../types'
import { watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { validate } = useForm('form')
const emits = defineEmits(['save', 'cancel'])

const props = defineProps<{
  network: Network
  instanceListOptions: any[]
  submitText: string
}>()

const networkLocal = ref({ ...props.network })

watch(
  () => props.network,
  (value) => {
    networkLocal.value = { ...value }
  },
  { deep: true },
)

const submit = () => {
  if (validate()) {
    emits('save', {
      ...networkLocal.value,
    })
  }
}
</script>
