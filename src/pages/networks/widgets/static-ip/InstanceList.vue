<template>
  <VaForm ref="form" @submit.prevent="submit">
    <VaSelect
      v-model="networkLocal.instance_id"
      :options="instanceListOptions"
      :rules="[(v) => !!v || '此为必选项']"
      class="mb-4"
      label="选择实例"
      text-by="label" value-by="value" track-by="value"
    />

    <div class="flex justify-end gap-3">
      <VaButton color="secondary" preset="secondary" @click="emits('cancel')">取消</VaButton>
      <VaButton @click="submit">{{ submitText }}</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { useForm } from 'vuestic-ui'
import { Network } from '../../types'
import { watch, ref } from 'vue'

const { validate } = useForm('form')
const emits = defineEmits(['save', 'cancel'])

const props = defineProps<{
  network: Network
  instanceListOptions: {}[]
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
