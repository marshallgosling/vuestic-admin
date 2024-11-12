<template>
  <VaModal
    max-width="530px"
    :mobile-fullscreen="false"
    hide-default-actions
    model-value
    close-button
    @update:modelValue="emits('cancel')"
  >
    <h1 class="va-h5 mb-4">{{ t('auth.reset_password') }}</h1>
    <VaForm ref="form" class="space-y-6" @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VaInput
          v-model="oldPassowrd"
          :rules="oldPasswordRules"
          :label="t('auth.old_password')"
          placeholder=""
          required-mark
          type="password"
        />
        <div class="hidden md:block" />
        <VaInput
          v-model="newPassword"
          :rules="newPasswordRules"
          :label="t('auth.new_password')"
          placeholder=""
          required-mark
          type="password"
        />
        <VaInput
          v-model="repeatNewPassword"
          :rules="repeatNewPasswordRules"
          label="Repeat new password"
          placeholder="Repeat new password"
          required-mark
          type="password"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <div class="flex space-x-2 items-center">
          <div>
            <VaIcon :name="newPassword?.length! >= 8 ? 'mso-check' : 'mso-close'" color="secondary" size="20px" />
          </div>
          <p>{{ t('rules.password_length') }}</p>
        </div>
        <div class="flex space-x-2 items-center">
          <div>
            <VaIcon
              :name="newPassword == repeatNewPassword ? 'mso-check' : 'mso-close'"
              color="secondary"
              size="20px"
            />
          </div>
          <p>{{ t('rules.password_length') }}</p>
        </div>
      </div>
      <div class="flex flex-col-reverse md:justify-end md:flex-row md:space-x-4">
        <VaButton :style="buttonStyles" preset="secondary" color="secondary" @click="emits('cancel')"> Cancel</VaButton>
        <VaButton :style="buttonStyles" class="mb-4 md:mb-0" type="submit" @click="submit"> Update Password</VaButton>
      </div>
    </VaForm>
  </VaModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, useToast } from 'vuestic-ui'
import { useUserStore } from '../../../stores/user-store'
import { buttonStyles } from '../styles'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useUserStore()

const oldPassowrd = ref<string>()
const newPassword = ref<string>()
const repeatNewPassword = ref<string>()

const { validate } = useForm('form')
const { init } = useToast()

const emits = defineEmits(['cancel'])

const submit = () => {
  if (validate()) {
    store.changePassword(newPassword.value!)
    init({ message: t('reset_password_success'), color: 'success' })
    emits('cancel')
  }
}

const oldPasswordRules = [(v: string) => !!v || t('rules.old_password_required')]

const newPasswordRules = [
  (v: string) => !!v || t('rules.password_required'),
  (v: string) => v?.length >= 8 || t('rules.password_length'),
  (v: string) => new Set(v).size >= 6 || t('rules.password_unique'),
  (v: string) => v !== oldPassowrd.value || t('rules.password_same'),
]

const repeatNewPasswordRules = [
  (v: string) => !!v || t('rules.repeat_password'),
  (v: string) => v === newPassword.value || t('rules.password_match'),
]
</script>

<style lang="scss">
.va-modal__inner {
  min-width: 326px;
}
</style>
