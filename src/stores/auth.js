import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('supabase.auth.token') || null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  // Initialize auth state from Supabase
  const initializeAuth = async () => {
    try {
      // First try to get Supabase session
      const { data: { session }, error } = await supabase.auth.getSession()
      if (session) {
        user.value = session.user
        token.value = session.access_token
        return
      }
      
      // Fallback to mock authentication from storage
      const storedUser = localStorage.getItem('supabase.auth.user') || sessionStorage.getItem('supabase.auth.user')
      const storedToken = localStorage.getItem('supabase.auth.token') || sessionStorage.getItem('supabase.auth.token')
      
      if (storedUser && storedToken) {
        try {
          user.value = JSON.parse(storedUser)
          token.value = storedToken
        } catch (parseError) {
          console.error('Error parsing stored user data:', parseError)
          // Clear invalid data
          logout()
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
    }
  }

  // Login with email and password
  const login = async (credentials) => {
    isLoading.value = true
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${credentials.username}@healthcare.local`, // Convert username to email
        password: credentials.password
      })

      if (error) {
        // Fallback to mock authentication for demo
        if (credentials.username === 'admin' && credentials.password === 'Admin@115') {
          const mockUser = {
            id: 'admin-user-id',
            username: 'admin',
            name: 'Administrator',
            role: 'admin',
            email: 'admin@healthcare.com'
          }
          
          const mockToken = 'mock-jwt-token-' + Date.now()
          
          user.value = mockUser
          token.value = mockToken
          
          if (credentials.rememberMe) {
            localStorage.setItem('supabase.auth.token', mockToken)
            localStorage.setItem('supabase.auth.user', JSON.stringify(mockUser))
          } else {
            sessionStorage.setItem('supabase.auth.token', mockToken)
            sessionStorage.setItem('supabase.auth.user', JSON.stringify(mockUser))
          }
          
          return true
        } else {
          throw new Error('Tên đăng nhập hoặc mật khẩu không đúng')
        }
      }

      if (data.session) {
        user.value = data.user
        token.value = data.session.access_token
        
        if (credentials.rememberMe) {
          localStorage.setItem('supabase.auth.token', data.session.access_token)
          localStorage.setItem('supabase.auth.user', JSON.stringify(data.user))
        } else {
          sessionStorage.setItem('supabase.auth.token', data.session.access_token)
          sessionStorage.setItem('supabase.auth.user', JSON.stringify(data.user))
        }
        
        return true
      }
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
    
    user.value = null
    token.value = null
    localStorage.removeItem('supabase.auth.token')
    localStorage.removeItem('supabase.auth.user')
    sessionStorage.removeItem('supabase.auth.token')
    sessionStorage.removeItem('supabase.auth.user')
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      user.value = session.user
      token.value = session.access_token
    } else {
      user.value = null
      token.value = null
    }
  })

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
