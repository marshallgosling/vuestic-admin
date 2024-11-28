<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useInstances } from './composables/useInstances'
import InstanceCards from './widgets/InstanceCards.vue'
import InstanceTable from './widgets/InstanceTable.vue'
import EditInstanceForm from './widgets/EditInstanceForm.vue'
import { Instance } from './types'
import { useModal, useToast } from 'vuestic-ui'
import { useI18n } from 'vue-i18n'
import { useInstancePricesStore } from '../../stores/price-store'
const { t } = useI18n()
const doShowAsCards = useLocalStorage('instances-view', false)
const pricingStore = useInstancePricesStore()
pricingStore.load()
const pricingList = computed(() => pricingStore.all)
const { instances, isLoading, sorting, pagination, ...usersApi } = useInstances()

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
    const ret = await usersApi.update(instance as Instance)
    notify({
      message: ret.message,
      color: ret.code == 200 ? 'success' : 'danger',
    })
  } else {
    const ret = await usersApi.add(instance as Instance)
    notify({
      message: ret.message,
      color: ret.code == 200 ? 'success' : 'danger',
    })
  }
}

const { confirm } = useModal()

const onInstanceReboot = async (instance: Instance) => {
  const response = await confirm({
    title: t('instance.reboot_instance'),
    message: t('instance.confirm_reboot', { name: instance.name }),
    okText: t('instance.reboot'),
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  const res = await usersApi.reboot(instance)
  if (res.code == 200) {
    notify({
      message: t('instance.reboot_success'),
      color: 'success',
    })
  } else {
    notify({
      message: res.message,
      color: 'danger',
    })
  }
}

const onInstanceStart = async (instance: Instance) => {
  const response = await confirm({
    title: t('instance.start_instance'),
    message: t('instance.confirm_start', { name: instance.name }),
    okText: t('instance.start'),
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  const res = await usersApi.start(instance)
  if (res.code == 200) {
    notify({
      message: t('instance.start_success'),
      color: 'success',
    })
  } else {
    notify({
      message: res.message,
      color: 'danger',
    })
  }
}

const onInstanceStop = async (instance: Instance) => {
  const response = await confirm({
    title: t('instance.stop_instance'),
    message: t('instance.confirm_stop', { name: instance.name }),
    okText: t('instance.stop'),
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  const res = await usersApi.stop(instance)
  if (res.code == 200) {
    notify({
      message: t('instance.stop_success'),
      color: 'success',
    })
  } else {
    notify({
      message: res.message,
      color: 'danger',
    })
  }
}

const onInstanceDeleted = async (instance: Instance) => {
  const response = await confirm({
    title: t('instance.delete_instance'),
    message: t('instance.confirm_delete', { name: instance.name }),
    okText: t('instance.delete'),
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  await usersApi.remove(instance)
  notify({
    message: t('instance.delete_success'),
    color: 'success',
  })
}

const editFormRef = ref()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: t('confirm.cancel'),
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
  <h1 class="page-title">{{ t('instance.instances') }}</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
            v-model="doShowAsCards"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: t('instance.card'), value: true },
              { label: t('instance.table'), value: false },
            ]"
          />
        </div>
        <VaButton icon="add" size="medium" @click="createNewInstance">{{ t('instance.start_instance') }}</VaButton>
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
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        :instances="instances"
        :loading="isLoading"
        :pagination="pagination"
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
      <h1 v-if="instanceToEdit === null" class="va-h5 mb-4">{{ t('instance.start_instance') }}</h1>
      <h1 v-else class="va-h5 mb-4">{{ t('instance.edit_instance') }}</h1>
      <EditInstanceForm
        ref="editFormRef"
        :instance="instanceToEdit"
        :prices="pricingList"
        :save-button-label="instanceToEdit === null ? t('instance.add') : t('instance.save')"
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
