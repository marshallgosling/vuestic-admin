<script setup lang="ts">
import { PropType, computed } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { Storage } from '../types'
import { Pagination } from '../../../api/types'
import StorageStatusBadge from '../components/StorageStatusBadge.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true },
  { label: '名称', key: 'name', sortable: true },
  { label: '大小', key: 'amount', sortable: true },
  { label: '状态', key: 'status', sortable: true },
  { label: '所属实例', key: 'instance', sortable: false },
  { label: '创建日期', key: 'created_at', sortable: true },
  { label: ' ', key: 'actions' },
])

const props = defineProps({
  storages: {
    type: Array as PropType<Storage[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  pagination: {
    type: Object as PropType<Pagination>,
    required: true,
  },
})

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))

defineEmits<{
  (event: 'check', instance: Storage): void
  (event: 'download', instance: Storage): void
  (event: 'delete', instance: Storage): void
}>()
</script>

<template>
  <VaDataTable :items="storages" :columns="columns" :loading="loading" :no-data-html="t('vuestic.noItems')">
    <template #cell(id)="{ rowData: key }">
      <div class="ellipsis max-w-[130px] lg:max-w-[250px]">
        <VaPopover :message="key.id">{{ key.id }}</VaPopover>
      </div>
    </template>
    <template #cell(name)="{ rowData: key }">
      <div class="flex items-center gap-2 ellipsis max-w-[130px]">
        {{ key.name }}
      </div>
    </template>
    <template #cell(amount)="{ rowData: key }">
      <div class="flex items-center gap-2 ellipsis max-w-[130px]">
        {{ key.amount }}
      </div>
    </template>
    <template #cell(status)="{ rowData: key }">
      <StorageStatusBadge :status="key.status" />
    </template>
    <template #cell(instance)="{ rowData: key }">
      <div class="flex items-center gap-2 ellipsis max-w-[230px]">
        <RouterLink v-if="key.instance" :to="{ name: 'instance', params: { id: key.instance?.id } }">{{
          key.instance?.name ?? '-'
        }}</RouterLink>
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
