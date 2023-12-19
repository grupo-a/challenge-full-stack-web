import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuth = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'))

    function setToken(tokenValue: string) {
        localStorage.setItem('token', tokenValue)
        token.value = tokenValue
    }

    return { setToken, token }
})
