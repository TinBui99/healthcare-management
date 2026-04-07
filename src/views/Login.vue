<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Healthcare Management</h2>
        <p>Đăng nhập hệ thống</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Tên đăng nhập</label>
          <input
            type="text"
            id="username"
            v-model="loginForm.username"
            :class="{ 'error': errors.username }"
            placeholder="Nhập tên đăng nhập"
            required
          />
          <span class="error-message" v-if="errors.username">{{ errors.username }}</span>
        </div>
        
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="loginForm.password"
              :class="{ 'error': errors.password }"
              placeholder="Nhập mật khẩu"
              required
            />
            <button type="button" @click="togglePassword" class="toggle-password">
              <Eye :size="20" v-if="!showPassword" />
              <EyeOff :size="20" v-else />
            </button>
          </div>
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>
        
        <div class="form-options">
          <label class="checkbox-container">
            <input type="checkbox" v-model="rememberMe" />
            <span class="checkmark"></span>
            Ghi nhớ đăng nhập
          </label>
        </div>
        
        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="!isLoading">Đăng nhập</span>
          <span v-else>Đang đăng nhập...</span>
        </button>
        
        <div class="login-info">
          <small>Tài khoản demo: admin / Admin@115</small>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const loginForm = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)

const validateForm = () => {
  let isValid = true
  
  errors.username = ''
  errors.password = ''
  
  if (!loginForm.username.trim()) {
    errors.username = 'Vui lòng nhập tên đăng nhập'
    isValid = false
  }
  
  if (!loginForm.password.trim()) {
    errors.password = 'Vui lòng nhập mật khẩu'
    isValid = false
  } else if (loginForm.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    isValid = false
  }
  
  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  
  try {
    const success = await authStore.login({
      username: loginForm.username,
      password: loginForm.password,
      rememberMe: rememberMe.value
    })
    
    if (success) {
      router.push('/')
    }
  } finally {
    isLoading.value = false
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #2d3748;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.login-header p {
  color: #718096;
  font-size: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
}

.form-group input {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error {
  border-color: #e53e3e;
}

.password-input {
  position: relative;
}

.password-input input {
  padding-right: 48px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #4a5568;
}

.error-message {
  color: #e53e3e;
  font-size: 12px;
  margin-top: 4px;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #4a5568;
}

.checkbox-container input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 16px;
  height: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s;
}

.checkbox-container input[type="checkbox"]:checked + .checkmark {
  background-color: #667eea;
  border-color: #667eea;
}

.checkbox-container input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 2px;
  color: white;
  font-size: 12px;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-info {
  text-align: center;
  margin-top: 20px;
}

.login-info small {
  color: #a0aec0;
  font-size: 14px;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  
  .login-header h2 {
    font-size: 20px;
  }
}
</style>
