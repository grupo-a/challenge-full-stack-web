// Utilities
import { defineStore } from 'pinia'

interface TokenUser  {
    id: string,
    name: string,
    email: string,
    authorization: string[],
}

export const useUserStore = defineStore('user', {
  state: () => ({
      id: '',
      name: '',
      email: '',
      authorization: <string[]>[],
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
