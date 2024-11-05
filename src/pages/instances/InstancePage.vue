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

const { instances, update, add, isLoading, remove, start, stop, reboot } = useInstances()

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
    const ret = await update(instance as Instance)
    notify({
      message: ret.message,
      color: ret.code==200?'success':'error',
    })
  } else {
    const ret = await add(instance as Instance)
    notify({
      message: ret.message,
      color: ret.code==200?'success':'error',
    })
  }
}

const { confirm } = useModal()

const onInstanceReboot = async (instance: Instance) => {
  const response = await confirm({
    title: 'Reboot Instance',
    message: `Are you sure you want to reboot Instance "${instance.name}"?`,
    okText: 'Reboot',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  const res = await reboot(instance)
  if(res.code == 200) {
    notify({
      message: 'Instance rebooted',
      color: 'success',
    })
  } else {
    notify({
      message: res.message,
      color: 'error',
    })
  }
}

const onInstanceStart = async (instance: Instance) => {
  const response = await confirm({
    title: 'Start Instance',
    message: `Are you sure you want to start Instance "${instance.name}"?`,
    okText: 'Start',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  const res = await start(instance)
  if(res.code == 200) {
    notify({
      message: 'Instance Started',
      color: 'success',
    })
  } else {
    notify({
      message: res.message,
      color: 'error',
    })
  }
  
}

const onInstanceStop = async (instance: Instance) => {
  const response = await confirm({
    title: 'Stop Instance',
    message: `Are you sure you want to stop Instance "${instance.name}"?`,
    okText: 'STOP',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  const res = await stop(instance)
  if(res.code == 200) {
    notify({
      message: 'Instance Stopped',
      color: 'success',
    })
  } else {
    notify({
      message: res.message,
      color: 'error',
    })
  }
  
}


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
        @reboot="onInstanceReboot"
        @start="onInstanceStart"
        @stop="onInstanceStop"
      />
      <InstanceTable
        v-else
        :instances="instances"
        :loading="isLoading"
        @edit="editInstance"
        @delete="onInstanceDeleted"
        @reboot="onInstanceReboot"
        @start="onInstanceStart"
        @stop="onInstanceStop"
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
      <h1 v-if="instanceToEdit === null" class="va-h5 mb-4">启动实例</h1>
      <h1 v-else class="va-h5 mb-4">修改实例</h1>
      <EditInstanceForm
        ref="editFormRef"
        :instance="instanceToEdit"
        :save-button-label="instanceToEdit === null ? '添加' : '保存'"
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
