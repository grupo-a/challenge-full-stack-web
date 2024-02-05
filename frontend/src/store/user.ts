// Utilities
import { defineStore } from 'pinia'

type TokenUser = {
    id: string,
    name: string,
    email: string,
    authorization: [],
}

export const useUserStore = defineStore('user', {
  state: () => ({
      id: '',
      name: '',
      email: '',
      authorization: [],
  }),

  actions: {
    setUser(user: TokenUser) {
      this.id = user.id,
      this.name = user.name,
      this.email = user.email,
      this.authorization = user.authorization
    },
  },


})
