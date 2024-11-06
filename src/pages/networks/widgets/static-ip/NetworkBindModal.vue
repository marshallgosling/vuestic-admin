<template>
  <VaModal hide-default-actions model-value size="small" close-button @cancel="emits('close')">
    <h3 class="va-h4 mb-4">绑定实例</h3>
    <InstanceList :network="props.network" submit-text="保存" @cancel="emits('close')" @save="bind" />
  </VaModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import InstanceList from './InstanceList.vue'
import { Network } from '../../types'
import { useToast } from 'vuestic-ui'
import { bindNetwork } from '../../../../api/network'

const isModalOpen = ref(false)
const { init } = useToast()

const props = defineProps<{
  network: Network
}>()

const emits = defineEmits(['close', 'reload'])

const bind = async (network: Network) => {
  isModalOpen.value = false
  const res = await bindNetwork(network)
  init({ message: res.message, color: res.code == 200 ? 'success' : 'error' })
  emits('close')
  emits('reload')
}
</script>
