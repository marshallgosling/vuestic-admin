<template>
  <VaModal hide-default-actions model-value size="small" close-button @cancel="emits('close')">
    <h3 class="va-h4 mb-4">修改静态IP</h3>
    <NetworkEdit :network="newNetwork" submit-text="保存" @cancel="emits('close')" @save="update" />
  </VaModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NetworkEdit from './NetworkEdit.vue'
import { Network } from '../../types'
import { useToast } from 'vuestic-ui'
import { updateNetwork } from '../../../../api/network'

const isModalOpen = ref(false)
const { init } = useToast()

const props = defineProps<{
  network: Network
}>()

const newNetwork = ref({ ...props.network })

console.log(newNetwork)

const emits = defineEmits(['close', 'reload'])

const update = async (network: Network) => {
  isModalOpen.value = false
  const res = await updateNetwork(network)
  init({ message: res.message, color: res.code == 200 ? 'success' : 'danger' })
  emits('close')
  if (res.code == 200) emits('reload')
}
</script>
