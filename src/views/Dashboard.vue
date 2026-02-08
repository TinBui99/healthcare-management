<template>
  <MainLayout>
    <div class="dashboard">
      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">
            <Users />
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ stats.totalPatients }}</div>
            <div class="stat-label">Tổng bệnh nhân</div>
            <div class="stat-change stat-change-positive">
              <TrendingUp />
              +12% so với tháng trước
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-green">
            <Calendar />
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ stats.todayAppointments }}</div>
            <div class="stat-label">Lịch hẹn hôm nay</div>
            <div class="stat-change stat-change-positive">
              <TrendingUp />
              +5% so với hôm qua
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-yellow">
            <DollarSign />
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ formatCurrency(stats.monthlyRevenue) }}</div>
            <div class="stat-label">Doanh thu tháng</div>
            <div class="stat-change stat-change-positive">
              <TrendingUp />
              +18% so với tháng trước
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">
            <Activity />
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ stats.pendingTasks }}</div>
            <div class="stat-label">Công việc chờ xử lý</div>
            <div class="stat-change stat-change-negative">
              <TrendingDown />
              -8% so với hôm qua
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Tables -->
      <div class="dashboard-grid">
        <!-- Appointment Chart -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Lịch hẹn theo {{ selectedChartPeriod === 'week' ? 'tuần' : selectedChartPeriod === 'month' ? 'tháng' : 'quý' }}</h3>
            <div class="card-actions">
              <div class="custom-select">
                <select v-model="selectedChartPeriod" class="form-select form-select-enhanced">
                  <option value="week">7 ngày qua</option>
                  <option value="month">30 ngày qua</option>
                  <option value="quarter">3 tháng qua</option>
                </select>
                <div class="select-arrow">
                  <ChevronDown />
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-placeholder">
              <div class="chart-bars">
                <div 
                  v-for="(item, index) in chartData" 
                  :key="index"
                  class="chart-bar-wrapper"
                  @mouseenter="hoveredBar = index"
                  @mouseleave="hoveredBar = null"
                >
                  <div 
                    class="chart-bar" 
                    :style="{ height: `${(item.appointments / maxAppointments) * 100}%` }"
                  ></div>
                  <div v-if="hoveredBar === index" class="chart-tooltip" :key="`tooltip-${index}`">
                    <div class="tooltip-value">{{ item.appointments }}</div>
                    <div class="tooltip-label">{{ item.day || item.month }}</div>
                  </div>
                </div>
              </div>
              <div class="chart-labels">
                <span v-for="(item, index) in chartData" :key="index">
                  {{ item.day || item.month }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Patients -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Bệnh nhân mới gần đây</h3>
            <router-link to="/patients" class="btn btn-secondary btn-sm">
              Xem tất cả
            </router-link>
          </div>
          <div class="card-body">
            <div class="patient-list">
              <div v-for="patient in recentPatients" :key="patient.id" class="patient-item">
                <div class="patient-avatar">
                  <User />
                </div>
                <div class="patient-info">
                  <div class="patient-name">{{ patient.name }}</div>
                  <div class="patient-details">{{ patient.age }} tuổi • {{ patient.gender }}</div>
                </div>
                <div class="patient-date">
                  {{ formatDate(patient.registerDate) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Appointments -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Lịch hẹn hôm nay</h3>
            <router-link to="/appointments" class="btn btn-secondary btn-sm">
              Xem tất cả
            </router-link>
          </div>
          <div class="card-body">
            <div class="appointment-list">
              <div v-for="appointment in todayAppointments" :key="appointment.id" class="appointment-item">
                <div class="appointment-time">
                  {{ appointment.time }}
                </div>
                <div class="appointment-info">
                  <div class="appointment-patient">{{ appointment.patientName }}</div>
                  <div class="appointment-service">{{ appointment.service }}</div>
                </div>
                <div class="appointment-status">
                  <span :class="getBadgeClass(appointment.status)">
                    {{ getStatusText(appointment.status) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Thao tác nhanh</h3>
          </div>
          <div class="card-body">
            <div class="quick-actions">
              <button class="quick-action-btn">
                <Plus />
                <span>Thêm bệnh nhân mới</span>
              </button>
              <button class="quick-action-btn">
                <Calendar />
                <span>Đặt lịch hẹn</span>
              </button>
              <button class="quick-action-btn">
                <FileText />
                <span>Tạo hồ sơ bệnh án</span>
              </button>
              <button class="quick-action-btn" @click="showPaymentModal = true">
                <CreditCard />
                <span>Thanh toán</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Modal -->
      <div v-if="showPaymentModal" class="modal-overlay" @click="closePaymentModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Thanh toán</h3>
            <button class="modal-close" @click="closePaymentModal">
              <X />
            </button>
          </div>
          
          <div class="modal-body">
            <form @submit.prevent="processPayment" class="payment-form">
              <div class="form-group">
                <label class="form-label">Bệnh nhân *</label>
                <select v-model="payment.patientId" class="form-select" required>
                  <option value="">Chọn bệnh nhân</option>
                  <option v-for="patient in recentPatients" :key="patient.id" :value="patient.id">
                    {{ patient.name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Dịch vụ *</label>
                <select v-model="payment.service" class="form-select" required>
                  <option value="">Chọn dịch vụ</option>
                  <option value="kham-benh">Khám bệnh</option>
                  <option value="xet-nghiem">Xét nghiệm</option>
                  <option value="sieu-am">Siêu âm</option>
                  <option value="tiem-vacxin">Tiêm vacxin</option>
                  <option value="kham-tong-quat">Khám tổng quát</option>
                </select>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Số tiền *</label>
                  <input
                    type="number"
                    v-model="payment.amount"
                    class="form-input"
                    placeholder="Nhập số tiền"
                    min="0"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Phương thức thanh toán *</label>
                  <select v-model="payment.method" class="form-select" required>
                    <option value="">Chọn phương thức</option>
                    <option value="tien-mat">Tiền mặt</option>
                    <option value="the-tin-dung">Thẻ tín dụng</option>
                    <option value="chuyen-khoan">Chuyển khoản</option>
                    <option value="vi-dien-tu">Ví điện tử</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Ghi chú</label>
                <textarea
                  v-model="payment.notes"
                  class="form-textarea"
                  placeholder="Ghi chú về thanh toán"
                  rows="3"
                ></textarea>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closePaymentModal">
              Hủy
            </button>
            <button type="submit" class="btn btn-primary" @click="processPayment">
              <CreditCard />
              Xử lý thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import {
  Users,
  Calendar,
  DollarSign,
  Activity,
  TrendingUp,
  TrendingDown,
  User,
  Plus,
  FileText,
  ChevronDown,
  CreditCard,
  X
} from 'lucide-vue-next'
import { dashboardStats, recentPatientsData, todayAppointmentsData, weeklyChartData, monthlyChartData, quarterlyChartData } from '@/data'

const stats = ref(dashboardStats)
const recentPatients = ref(recentPatientsData)
const todayAppointments = ref(todayAppointmentsData)
const selectedChartPeriod = ref('week')
const hoveredBar = ref(null)
const showPaymentModal = ref(false)

const payment = ref({
  patientId: '',
  service: '',
  amount: '',
  method: '',
  notes: ''
})

const chartData = computed(() => {
  switch (selectedChartPeriod.value) {
    case 'month':
      return monthlyChartData
    case 'quarter':
      return quarterlyChartData
    default:
      return weeklyChartData
  }
})

const maxAppointments = computed(() => {
  const data = chartData.value
  if (!data || data.length === 0) return 1
  return Math.max(...data.map(d => d.appointments))
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN')
}

const getBadgeClass = (status) => {
  const classes = {
    confirmed: 'badge badge-success',
    pending: 'badge badge-warning',
    cancelled: 'badge badge-danger'
  }
  return classes[status] || 'badge badge-secondary'
}

const getStatusText = (status) => {
  const texts = {
    confirmed: 'Xác nhận',
    pending: 'Chờ xác nhận',
    cancelled: 'Đã hủy'
  }
  return texts[status] || status
}

const closePaymentModal = () => {
  showPaymentModal.value = false
  resetPayment()
}

const resetPayment = () => {
  payment.value = {
    patientId: '',
    service: '',
    amount: '',
    method: '',
    notes: ''
  }
}

const processPayment = () => {
  // Get patient name
  const patient = recentPatients.value.find(p => p.id === payment.value.patientId)
  const patientName = patient ? patient.name : 'Unknown'
  
  // Create payment record
  const paymentRecord = {
    id: Date.now(),
    patientId: payment.value.patientId,
    patientName: patientName,
    service: payment.value.service,
    amount: parseFloat(payment.value.amount),
    method: payment.value.method,
    notes: payment.value.notes,
    date: new Date().toISOString().split('T')[0],
    status: 'completed'
  }
  
  // Update monthly revenue (for demo purposes)
  stats.value.monthlyRevenue += paymentRecord.amount
  
  // Close modal and reset form
  closePaymentModal()
  
  // Show success message (you could add a toast notification here)
  console.log('Thanh toán đã được xử lý:', paymentRecord)
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: var(--background);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  min-height: 100px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.stat-icon-blue {
  background-color: #3b82f6;
}

.stat-icon-green {
  background-color: #10b981;
}

.stat-icon-yellow {
  background-color: #f59e0b;
}

.stat-icon-purple {
  background-color: #8b5cf6;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  word-break: break-all;
  overflow-wrap: break-word;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

.stat-change-positive {
  color: var(--success-color);
}

.stat-change-negative {
  color: var(--danger-color);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.custom-select {
  position: relative;
  display: inline-block;
}

.form-select-enhanced {
  appearance: none;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  min-width: 140px;
  position: relative;
}

.form-select-enhanced option {
  background: #ffffff;
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.form-select-enhanced option:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.form-select-enhanced option:checked {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-weight: 600;
}

.form-select-enhanced:hover {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.form-select-enhanced:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.select-arrow {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.form-select-enhanced:hover + .select-arrow {
  color: var(--primary-color);
}

.form-select-enhanced:focus + .select-arrow {
  color: var(--primary-color);
}

.form-select-sm {
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
}

.chart-placeholder {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  height: 150px;
  width: 100%;
  flex: 1;
}

.chart-bar-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  height: 100%;
}

.chart-bar {
  background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 6px 6px 0 0;
  min-height: 5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  max-width: 40px;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.chart-bar-wrapper:hover .chart-bar {
  background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  border: 2px solid #3b82f6;
}

.chart-tooltip {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  white-space: nowrap;
  z-index: 1000;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  text-align: center;
  line-height: 1.3;
  min-width: 70px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
}

.chart-tooltip * {
  display: block;
}

.chart-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.95);
  margin-top: -1px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.tooltip-value {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.125rem;
}

.tooltip-label {
  font-size: 0.625rem;
  opacity: 0.8;
}

.chart-labels {
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: space-around;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.patient-list,
.appointment-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.patient-item,
.appointment-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: var(--radius);
  transition: background-color 0.2s;
}

.patient-item:hover,
.appointment-item:hover {
  background-color: var(--surface);
}

.patient-avatar {
  width: 40px;
  height: 40px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.patient-info {
  flex: 1;
}

.patient-name,
.appointment-patient {
  font-weight: 500;
  color: var(--text-primary);
}

.patient-details,
.appointment-service {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.patient-date {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.appointment-time {
  font-weight: 600;
  color: var(--primary-color);
  min-width: 50px;
}

.appointment-status {
  min-width: 80px;
  text-align: right;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.quick-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--background);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.quick-action-btn:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1200px) {
  .stat-number {
    font-size: 1.25rem;
  }
  
  .stat-card {
    padding: 1.25rem;
  }
}

@media (min-width: 1400px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
  
  .stat-number {
    font-size: 1.375rem;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  animation: modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.625rem 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;
  background: white;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
}
</style>
