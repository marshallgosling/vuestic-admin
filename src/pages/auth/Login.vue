<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">登录操控台</h1>
    <p class="text-base mb-4 leading-5">
      还未成为会员？
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">立即注册</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="Email 邮箱"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="密码"
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
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" label="保持登录" />
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit()" :disabled="formData.submiting">登录</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../services/utils'
import { login } from '../../api/auth'

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: true,
  submiting: false
})

const submit = async () => {
  if (validate()) {
    formData.submiting = true;
    const loginUser = await login(formData.email, formData.password)
    if (loginUser.code == 200) {
      localStorage.setItem('token', loginUser.data.token)
      init({ message: loginUser.message, color: 'success' })
      push({ name: 'dashboard' })
    } else {
      init({ message: loginUser.message, color: 'error' })
    }
    formData.submiting = false;
  }
}
</script>
