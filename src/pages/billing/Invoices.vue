<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <h2 class="page-sub-title mb-2">{{ t('billing.invoices') }}</h2>
      <div class="flex items-center mt-2 justify-between md:justify-items-stretch mb-1">
        <div class="flex items-center w-24 font-bold">
          {{ t('billing.month') }}
        </div>
        <div class="w-56 font-bold">
          {{ t('billing.amount') }}
        </div>

        <div class="w-24 font-bold">
          {{ t('billing.status') }}
        </div>
        <div class="w-20"></div>
      </div>
      <VaDivider />
      <template v-for="(item, index) in invoices" :key="item.id">
        <div class="flex items-center justify-between md:justify-items-stretch">
          <div class="flex items-center w-24">
            {{ item.name }}
          </div>
          <div class="w-56">{{ currency }} {{ item.amount }}</div>

          <div class="w-24">
            <BillingStatusBadge :status="item.status" />
          </div>
          <div class="w-20">
            <VaButton v-if="item.status < 2" preset="primary" size="small" @click="download(item)">{{
              t('billing.download')
            }}</VaButton>
          </div>
        </div>
        <VaDivider v-if="index !== invoices.length - 1" />
      </template>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BillingStatusBadge from './BillingStatusBadge.vue'
import { Invoice } from './types'
// import { downloadInvoice } from '../../api/billing'

const { t } = useI18n()

defineProps({
  invoices: {
    type: Array as PropType<Invoice[]>,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
})

const download = async (key: Invoice) => {
  window.open('/api/invoice/download/' + key.id)
  // const ret = await downloadInvoice(key.id)
  // const blob = new Blob([ret])
  // const downloadElement = document.createElement('a')
  // const href = window.URL.createObjectURL(blob)
  // const fileName = 'invoice.pdf'
  // downloadElement.download = `${fileName}` // 下载后文件名
  // downloadElement.href = href //链接等于链接
  // document.body.appendChild(downloadElement) //将元素加在dom尾部
  // downloadElement.click() //点击a链接
  // document.body.removeChild(downloadElement) //点击完后删掉
  // window.URL.revokeObjectURL(href) //释放这个url内存
}
</script>
