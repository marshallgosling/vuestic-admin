<template>
  <div class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">{{ t('auth.name') }}</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ store.userName }}
      </div>
    </div>
    <VaButton :style="buttonStyles" class="w-fit h-fit" preset="primary" @click="emits('openNameModal')">
      {{ t('user.edit') }}
    </VaButton>
  </div>
  <VaDivider />
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">Email</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ store.email }}
      </div>
    </div>
  </div>
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">{{ t('auth.password') }}</p>
    <div class="flex-1">
      <div class="max-w-[748px]">•••••••••••••</div>
    </div>
    <VaButton :style="buttonStyles" class="w-fit h-fit" preset="primary" @click="emits('openResetPasswordModal')">
      {{ t('auth.reset_password') }}
    </VaButton>
  </div>
  <VaDivider />
</template>
<script lang="ts" setup>
import { useUserStore } from '../../../stores/user-store'
import { buttonStyles } from '../styles'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useUserStore()
const emits = defineEmits(['openNameModal', 'openResetPasswordModal'])
</script>
