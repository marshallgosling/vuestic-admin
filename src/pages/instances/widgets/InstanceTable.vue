<script setup lang="ts">
import { PropType, computed } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { Instance } from '../types'
import UserAvatar from '../../users/widgets/UserAvatar.vue'
import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'
// import { Pagination, Sorting } from '../../../data/pages/projects'
import { useVModel } from '@vueuse/core'

const columns = defineVaDataTableColumns([
  { label: 'Project name', key: 'project_name', sortable: true },
  { label: 'Project owner', key: 'project_owner', sortable: true },
  { label: 'Team', key: 'team', sortable: true },
  { label: 'Status', key: 'status', sortable: true },
  { label: 'Creation Date', key: 'created_at', sortable: true },
  { label: ' ', key: 'actions' },
])

const props = defineProps({
  instances: {
    type: Array as PropType<Instance[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  // sortBy: {
  //   type: Object as PropType<Sorting['sortBy']>,
  //   required: true,
  // },
  // sortingOrder: {
  //   type: Object as PropType<Sorting['sortingOrder']>,
  //   required: true,
  // },
  // pagination: {
  //   type: Object as PropType<Pagination>,
  //   required: true,
  // },
})

const emit = defineEmits<{
  (event: 'edit', instance: Instance): void
  (event: 'delete', instance: Instance): void
  (event: 'start', instance: Instance): void
  (event: 'stop', instance: Instance): void
  (event: 'reboot', instance: Instance): void
}>()

const avatarColor = (userName: string) => {
  const colors = ['primary', '#FFD43A', '#ADFF00', '#262824', 'danger']
  const index = userName.charCodeAt(0) % colors.length
  return colors[index]
}

// const sortByVModel = useVModel(props, 'sortBy', emit)
// const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

</script>

<template>
  <div>
    <VaDataTable
      :items="instances"
      :columns="columns"
      :loading="loading"
    >
      <template #cell(id)="{ rowData: instance }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ instance.id }}
        </div>
      </template>
      <template #cell(name)="{ rowData: instance }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">
          {{ instance.name }}
        </div>
      </template>
      
      <template #cell(status)="{ rowData: instance }">
        <ProjectStatusBadge :status="instance.status" />
      </template>

      <template #cell(actions)="{ rowData: instance }">
        <div class="flex gap-2 justify-end">
          <VaButton
            preset="primary"
            size="small"
            color="primary"
            icon="mso-play"
            aria-label="Start"
            @click="$emit('start', instance as Instance)"
          />
          <VaButton
            preset="primary"
            size="small"
            color="primary"
            icon="mso-stop"
            aria-label="Stop"
            @click="$emit('stop', instance as Instance)"
          />
          <VaButton
            preset="primary"
            size="small"
            color="primary"
            icon="mso-edit"
            aria-label="Reboot"
            @click="$emit('reboot', instance as Instance)"
          />
          <VaButton
            preset="primary"
            size="small"
            color="primary"
            icon="mso-edit"
            aria-label="Edit"
            @click="$emit('edit', instance as Instance)"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete"
            @click="$emit('delete', instance as Instance)"
          />
        </div>
      </template>
    </VaDataTable>
    
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
