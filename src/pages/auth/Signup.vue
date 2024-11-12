<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">{{ t('auth.sign_up') }}</h1>
    <p class="text-base mb-4 leading-5">
      {{ t('auth.already_a_member') }}
      <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary">{{ t('auth.login') }}</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[(v) => !!v || t('rules.email_required'), (v) => /.+@.+\..+/.test(v) || t('rules.email_valid')]"
      class="mb-4"
      :label="t('auth.email')"
      type="email"
    />
    <VaInput v-model="formData.name" class="mb-4" :label="t('auth.name')" type="text" />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        ref="password1"
        v-model="formData.password"
        :rules="passwordRules"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        :label="t('auth.password')"
        :messages="t('rules.password')"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
      <VaInput
        ref="password2"
        v-model="formData.repeatPassword"
        :rules="[
          (v) => !!v || 'Repeat Password field is required',
          (v) => v === formData.password || 'Passwords don\'t match',
        ]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        :label="t('auth.password')"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" :disabled="formData.submiting" @click="submit"> {{ t('auth.createAccount') }}</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { register } from '../../api/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  name: '',
  password: '',
  repeatPassword: '',
  submiting: false,
})

const submit = async () => {
  if (validate()) {
    formData.submiting = true
    const loginUser = await register(formData.email, formData.name, formData.password)
    if (loginUser.code == 200) {
      init({ message: loginUser.message, color: 'success' })
      push({ name: 'login' })
    } else {
      init({ message: loginUser.message, color: 'danger' })
    }
    formData.submiting = false
  }
}

const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || t('rules.password_required'),
  (v) => (v && v.length >= 8) || t('rules.password_length'),
  (v) => (v && /[A-Za-z]/.test(v)) || t('rules.password_empty'),
  (v) => (v && /\d/.test(v)) || t('rules.password_number'),
  (v) => (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || t('rules.password_special'),
]
</script>
