<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-icon">
        <Shield :size="80" />
      </div>
      <h1 class="error-title">403</h1>
      <h2 class="error-subtitle">Truy cập bị từ chối</h2>
      <p class="error-message">
        Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản có quyền thích hợp.
      </p>
      <div class="error-actions">
        <button @click="goBack" class="btn btn-secondary">
          <ArrowLeft :size="16" />
          Quay lại
        </button>
        <router-link to="/login" class="btn btn-primary">
          <LogIn :size="16" />
          Đăng nhập
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Shield, ArrowLeft, LogIn } from 'lucide-vue-next'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  padding: 20px;
}

.error-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 60px 40px;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.error-icon {
  color: #f59e0b;
  margin-bottom: 20px;
  display: inline-block;
}

.error-title {
  font-size: 72px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 10px 0;
  line-height: 1;
}

.error-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #4a5568;
  margin: 0 0 20px 0;
}

.error-message {
  font-size: 16px;
  color: #718096;
  margin-bottom: 40px;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.btn-secondary {
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #edf2f7;
  transform: translateY(-1px);
}

@media (max-width: 480px) {
  .error-container {
    padding: 40px 20px;
  }
  
  .error-title {
    font-size: 48px;
  }
  
  .error-subtitle {
    font-size: 20px;
  }
  
  .error-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
