<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">{{ t('auth.console') }}</h1>
    <p class="text-base mb-4 leading-5">
      {{ t('auth.not_a_member') }}
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">{{
        t('auth.sign_up_rightnow')
      }}</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      :label="t('auth.email')"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
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

    <div class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" :label="t('auth.keep_logged_in')" />
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" :disabled="formData.submiting" type="submit">{{ t('auth.login') }}</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { login } from '../../api/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: true,
  submiting: false,
})

/** Validation */
const validators = {
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(v) || t('rules.email_invalid')
  },
  required: (v: any) => !!v || t('rules.required'),
}

const submit = async () => {
  if (validate()) {
    formData.submiting = true
    const loginUser = await login(formData.email, formData.password)
    if (loginUser.code == 200) {
      localStorage.setItem('token', loginUser.data.token)
      init({ message: t('auth.' + loginUser.message), color: 'success' })
      push({ name: 'instances' })
    } else {
      init({ message: t('auth.' + loginUser.message), color: 'danger' })
    }
    formData.submiting = false
  }
}
</script>
