import { defineStore } from 'pinia'
import { getUserProfile } from '../api/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: '',
      email: '',
      is2FAEnabled: false,
    }
  },

  actions: {
    toggle2FA() {
      this.is2FAEnabled = !this.is2FAEnabled
    },

    changeUserName(userName: string) {
      this.userName = userName
    },

    async fetchUserPreference() {
      const loginUser = await getUserProfile()
      this.userName = loginUser.data.name
      this.email = loginUser.data.email
      // this.group = loginUser.data.group
      // this.avatar = loginUser.data.avatar
    },
  },
})
