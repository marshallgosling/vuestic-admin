<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useInstances } from './composables/useInstances'
import InstanceCards from './widgets/InstanceCards.vue'
import InstanceTable from './widgets/InstanceTable.vue'
import EditInstanceForm from './widgets/EditInstanceForm.vue'
import { Instance } from './types'
import { useModal, useToast } from 'vuestic-ui'

const doShowAsCards = useLocalStorage('instances-view', true)

const { instances, update, add, isLoading, remove, start, stop, reboot, init } = useInstances()

const instanceToEdit = ref<Instance | null>(null)
const doShowInstanceFormModal = ref(false)

const editInstance = (instance: Instance) => {
  instanceToEdit.value = instance
  doShowInstanceFormModal.value = true
}

const createNewInstance = () => {
  instanceToEdit.value = null
  doShowInstanceFormModal.value = true
}

const { init: notify } = useToast()

const onInstanceSaved = async (instance: Instance) => {
  doShowInstanceFormModal.value = false
  if ('id' in instance) {
    await update(instance as Instance)
    notify({
      message: 'Instance updated',
      color: 'success',
    })
  } else {
    await add(instance as Instance)
    notify({
      message: 'Instance created',
      color: 'success',
    })
  }
}

const { confirm } = useModal()

const onInstanceDeleted = async (instance: Instance) => {
  const response = await confirm({
    title: 'Delete Instance',
    message: `Are you sure you want to delete Instance "${instance.name}"?`,
    okText: 'Delete',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  await remove(instance)
  notify({
    message: 'Instance deleted',
    color: 'success',
  })
}

const editFormRef = ref()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: 'Form has unsaved changes. Are you sure you want to close it?',
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
  <h1 class="page-title">AI 实例列表</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
            v-model="doShowAsCards"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: '图标', value: true },
              { label: '列表', value: false },
            ]"
          />
        </div>
        <VaButton icon="add" @click="createNewInstance">启动实例</VaButton>
      </div>

      <InstanceCards
        v-if="doShowAsCards"
        :instances="instances"
        :loading="isLoading"
        @edit="editInstance"
        @delete="onInstanceDeleted"
      />
      <InstanceTable
        v-else
        :instances="instances"
        :loading="isLoading"
        @edit="editInstance"
        @delete="onInstanceDeleted"
      />
    </VaCardContent>

    <VaModal
      v-slot="{ cancel, ok }"
      v-model="doShowInstanceFormModal"
      size="small"
      mobile-fullscreen
      close-button
      stateful
      hide-default-actions
      :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="instanceToEdit === null" class="va-h5 mb-4">Add instance</h1>
      <h1 v-else class="va-h5 mb-4">Edit instance</h1>
      <EditInstanceForm
        ref="editFormRef"
        :instance="instanceToEdit"
        :save-button-label="instanceToEdit === null ? 'Add' : 'Save'"
        @close="cancel"
        @save="
          (instance) => {
            onInstanceSaved(instance)
            ok()
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
