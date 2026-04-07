import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials) => {
    isLoading.value = true
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check credentials (admin / Admin@115)
      if (credentials.username === 'admin' && credentials.password === 'Admin@115') {
        const mockToken = 'mock-jwt-token-' + Date.now()
        const userData = {
          id: 1,
          username: 'admin',
          name: 'Administrator',
          role: 'admin',
          email: 'admin@healthcare.com'
        }
        
        token.value = mockToken
        user.value = userData
        
        // Store token in localStorage
        if (credentials.rememberMe) {
          localStorage.setItem('token', mockToken)
          localStorage.setItem('user', JSON.stringify(userData))
        } else {
          sessionStorage.setItem('token', mockToken)
          sessionStorage.setItem('user', JSON.stringify(userData))
        }
        
        return true
      } else {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng')
      }
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
  }

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token')
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        logout()
      }
    }
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    initializeAuth
  }
})
