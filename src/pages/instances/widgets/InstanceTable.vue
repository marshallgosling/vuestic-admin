<script setup lang="ts">
import { PropType, computed, toRef } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { Instance, Sorting, DomainStringMap, ProfileStringMap } from '../types'
import InstanceStatusBadge from '../components/InstanceStatusBadge.vue'
import { Pagination } from '../../../api/types'
import { useI18n } from 'vue-i18n'
import { useVModel } from '@vueuse/core'

const { t } = useI18n()

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true },
  { label: t('instance.name'), key: 'name', sortable: false },
  { label: t('instance.type'), key: 'type', sortable: true },
  { label: t('instance.domain'), key: 'domain', sortable: false },
  { label: t('network.private_ip_list'), key: 'private', sortable: false },
  { label: t('network.static_ip_list'), key: 'static', sortable: false },
  { label: t('instance.status'), key: 'status', sortable: true },
  { label: t('instance.description'), key: 'description', sortable: true },
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
  sortBy: {
    type: Object as PropType<Sorting['sortBy']>,
    required: true,
  },
  sortingOrder: {
    type: Object as PropType<Sorting['sortingOrder']>,
    required: true,
  },
  pagination: {
    type: Object as PropType<Pagination>,
    required: true,
  },
  button: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'edit', instance: Instance): void
  (event: 'delete', instance: Instance): void
  (event: 'start', instance: Instance): void
  (event: 'stop', instance: Instance): void
  (event: 'reboot', instance: Instance): void
  (event: 'update:sortBy', sortBy: Sorting['sortBy']): void
  (event: 'update:sortingOrder', sortingOrder: Sorting['sortingOrder']): void
}>()

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))

const instances = toRef(props, 'instances')
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)
</script>

<template>
  <VaDataTable
    v-model:sort-by="sortByVModel"
    v-model:sorting-order="sortingOrderVModel"
    :items="instances"
    :columns="columns"
    :loading="loading"
    :no-data-html="t('vuestic.noItems')"
  >
    <template #cell(id)="{ rowData: instance }">
      <div class="ellipsis max-w-[130px] lg:max-w-[250px]">
        <VaPopover :message="instance.id">{{ instance.id }}</VaPopover>
      </div>
    </template>
    <template #cell(name)="{ rowData: instance }">
      <div class="flex items-center gap-2 ellipsis max-w-[230px]">
        <RouterLink :to="{ name: 'instance', params: { id: instance.id } }">{{ instance.name }}</RouterLink>
      </div>
    </template>
    <template #cell(type)="{ rowData: instance }">
      <div class="flex items-center gap-2 ellipsis max-w-[60px]">
        <VaPopover :message="ProfileStringMap[instance.instance_type]">
          {{ instance.instance_type }}
        </VaPopover>
      </div>
    </template>
    <template #cell(domain)="{ rowData: instance }">
      <div class="flex items-center gap-2 ellipsis max-w-[30px]">
        <VaPopover :message="DomainStringMap[instance.domain]">{{ instance.domain }}</VaPopover>
      </div>
    </template>
    <template #cell(private)="{ rowData: instance }">
      <div class="flex items-center gap-2 ellipsis max-w-[130px]">
        {{ instance.networks[0]?.ip ?? '-' }}
      </div>
    </template>
    <template #cell(static)="{ rowData: instance }">
      <div class="flex items-center gap-2 ellipsis max-w-[130px]">
        {{ instance.networks[1]?.ip ?? '-' }}
      </div>
    </template>
    <template #cell(status)="{ rowData: instance }">
      <InstanceStatusBadge :status="instance.status" />
    </template>

    <template #cell(actions)="{ rowData: instance }">
      <div class="flex gap-2 justify-end">
        <RouterLink :to="{ name: 'instance', params: { id: instance.id } }">{{ t('instance.info') }}</RouterLink>
        <VaButton
          v-if="button"
          preset="primary"
          size="small"
          color="success"
          icon="mso-play_arrow"
          aria-label="Start"
          @click="$emit('start', instance as Instance)"
        />
        <VaButton
          v-if="button"
          preset="primary"
          size="small"
          color="danger"
          icon="mso-highlight_keyboard_focus"
          aria-label="Stop"
          @click="$emit('stop', instance as Instance)"
        />
        <VaButton
          v-if="button"
          preset="primary"
          size="small"
          color="warning"
          icon="mso-forward_media"
          aria-label="Reboot"
          @click="$emit('reboot', instance as Instance)"
        />

        <VaButton
          v-if="button"
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
  <div class="flex flex-col-reverse md:flex-row gap-5 justify-between items-center py-2">
    <div>
      <b>{{
        t('vuestic.total', {
          start: ($props.pagination.page - 1) * $props.pagination.perPage + 1,
          end:
            $props.pagination.page * $props.pagination.perPage > $props.pagination.total
              ? $props.pagination.total
              : $props.pagination.page * $props.pagination.perPage,
          total: $props.pagination.total,
        })
      }}</b>
    </div>
    <div v-if="totalPages > 1" class="flex">
      <VaSelect v-model="$props.pagination.perPage" class="!w-20" :options="[15, 30, 90]" />

      <VaPagination
        v-model="$props.pagination.page"
        buttons-preset="secondary"
        :pages="totalPages"
        :visible-pages="5"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
