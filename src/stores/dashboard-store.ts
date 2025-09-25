import { defineStore } from 'pinia'
import { getUserProfile, setUserPassword, setUserProfile } from '../api/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: '',
      email: '',
      password: '',
    }
  },

  actions: {
    async changeUserName(userName: string) {
      this.userName = userName
      await setUserProfile({ uid: localStorage.getItem('uid') ?? '', name: userName })
    },

    async changePassword(password: string) {
      //this.password = password
      await setUserPassword({ uid: localStorage.getItem('uid') ?? '', password })
    },

    async fetchUserPreference() {
      const loginUser = await getUserProfile(localStorage.getItem('uid') ?? '')
      this.userName = loginUser.data.name
      this.email = loginUser.data.email
      // this.group = loginUser.data.group
      // this.avatar = loginUser.data.avatar
    },
  },
})
