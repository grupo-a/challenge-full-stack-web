import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })

        const result = await response.json()

        if (result.success) {
          this.token = result.token
          this.user = result.user
          this.isAuthenticated = true
          
          localStorage.setItem('token', result.token)
          localStorage.setItem('user', JSON.stringify(result.user))
          
          return { success: true }
        } else {
          return { success: false, message: result.message }
        }
      } catch (error) {
        return { success: false, message: 'Erro de conexão' }
      }
    },
    
    
    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    initialize() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        this.isAuthenticated = true
        
      }
      
    },
    async authenticatedFetch(url, options = {}) {
    console.log('🔐 Token atual:', this.token)
    console.log('🌐 Fazendo request para:', url)
    
    if (!this.token) {
        this.initialize()
        console.log('🔄 Token reinicializado:', this.token)
    }

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
            'Authorization': `Bearer ${this.token}`
        }
    }

    console.log('📤 Headers enviados:', config.headers)
    
    const response = await fetch(url, config)
    console.log('📥 Status da resposta:', response.status)
    
    return response
}
}
})