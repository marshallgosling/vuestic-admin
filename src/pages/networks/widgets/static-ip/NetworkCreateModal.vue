<template>
  <VaModal hide-default-actions model-value size="small" close-button @cancel="emits('close')">
    <h3 class="va-h4 mb-4">创建静态IP</h3>
    <NetworkEdit :network="newNetwork" submit-text="创建" @cancel="emits('close')" @save="create" />
  </VaModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NetworkEdit from './NetworkEdit.vue'
import { EmptyNetwork } from '../../types'
import { usePaymentCardsStore } from '../../../../stores/payment-cards'
import { useToast } from 'vuestic-ui'
import { createNetwork } from '../../../../api/network'

const isModalOpen = ref(false)

const emits = defineEmits(['close'])
const store = usePaymentCardsStore()
const { init } = useToast()

const defaultNewNetwork: EmptyNetwork = {
  id: '',
  name: '',
  instance_id: '',
  type: ''
}

const newNetwork = ref({ ...defaultNewNetwork })

const create = async (network: EmptyNetwork) => {
  isModalOpen.value = false
  const ret = await createNetwork(network)
  init({ message: ret.message, color: ret.code==200?'success':'error' })
  emits('close')
}
</script>
