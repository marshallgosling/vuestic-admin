<script setup lang="ts">
import { ref } from 'vue'
import { useKeyPairs } from './composables/useKeyPairs'
import KeyTable from './widgets/KeyTable.vue'
import EditKeyForm from './widgets/EditKeyForm.vue'
import { KeyPair } from './types'
import { useModal, useToast } from 'vuestic-ui'

useKeyPairs
const { keys, add, isLoading, remove, enable } = useKeyPairs()

const keyToEdit = ref<KeyPair | null>(null)
const doShowKeyPairFormModal = ref(false)

const editInstance = (instance: KeyPair) => {
  keyToEdit.value = instance
  doShowKeyPairFormModal.value = true
}

const createNewKeyPair = () => {
  keyToEdit.value = null
  doShowKeyPairFormModal.value = true
}

const { init: notify } = useToast()

const onKeySaved = async (instance: KeyPair) => {
  doShowKeyPairFormModal.value = false
  if ('id' in instance) {
    //const ret = await update(instance as KeyPair)
    // notify({
    //   message: ret.message,
    //   color: ret.code==200?'success':'error',
    // })
  } else {
    const ret = await add(instance as KeyPair)
    notify({
      message: ret.message,
      color: ret.code==200?'success':'error',
    })
  }
}

const { confirm } = useModal()

const onKeyDeleted = async (key: KeyPair) => {
  const response = await confirm({
    title: 'Delete Instance',
    message: `Are you sure you want to delete Key "${key.name}"?`,
    okText: 'Delete',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  const ret = await remove(key)
  notify({
      message: ret.message,
      color: ret.code==200?'success':'error',
    })
}

const onKeyCheck = async (key: KeyPair) => {
  const response = await confirm({
    title: 'Enable Key',
    message: `Are you sure you want to enable Key "${key.name}"?`,
    okText: 'Enable',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  const ret = await enable(key)
  notify({
      message: ret.message,
      color: ret.code==200?'success':'error',
    })
}

const editFormRef = ref()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: '确认要取消吗？',
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}
</script>

<template>
  <h1 class="page-title">密钥对</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaButton icon="add" @click="createNewKeyPair">创建</VaButton>
      </div>

      <KeyTable
        :keys="keys"
        :loading="isLoading"
        @check="onKeyCheck"
        @delete="onKeyDeleted"
      />
    </VaCardContent>

    <VaModal
      v-slot="{ cancel, ok }"
      v-model="doShowKeyPairFormModal"
      size="small"
      mobile-fullscreen
      close-button
      stateful
      hide-default-actions
      :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="keyToEdit === null" class="va-h5 mb-4">create key</h1>
      <h1 v-else class="va-h5 mb-4">Edit key</h1>
      <EditKeyForm
        ref="editFormRef"
        :keypair="keyToEdit"
        :save-button-label="keyToEdit === null ? 'Add' : 'Save'"
        @close="cancel"
        @save="
          (keypair) => {
            onKeySaved(keypair)
            ok()
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
