<template>
  <MainLayout>
    <div class="appointments-page">
      <!-- Header Actions -->
      <div class="page-header">
        <div class="header-actions">
          <button class="btn btn-primary">
            <Plus />
            Đặt lịch hẹn mới
          </button>
          <div class="filter-tabs">
            <button
              v-for="tab in filterTabs"
              :key="tab.value"
              @click="activeFilter = tab.value"
              :class="['tab-btn', { 'tab-btn-active': activeFilter === tab.value }]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Calendar View -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Lịch hẹn {{ getCurrentMonth() }}</h3>
          <div class="calendar-nav">
            <button class="btn btn-secondary btn-sm" @click="previousMonth">
              <ChevronLeft />
            </button>
            <span class="current-month">{{ getCurrentMonth() }}</span>
            <button class="btn btn-secondary btn-sm" @click="nextMonth">
              <ChevronRight />
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="calendar-grid">
            <div class="calendar-weekdays">
              <div v-for="day in weekDays" :key="day" class="weekday">
                {{ day }}
              </div>
            </div>
            <div class="calendar-days">
              <div
                v-for="day in calendarDays"
                :key="day.date"
                :class="['calendar-day', { 'calendar-day-today': day.isToday, 'calendar-day-other-month': day.isOtherMonth }]"
              >
                <div class="day-number">{{ day.day }}</div>
                <div v-if="day.appointments.length > 0" class="day-appointments">
                  <div
                    v-for="appointment in day.appointments.slice(0, 3)"
                    :key="appointment.id"
                    :class="['appointment-dot', `appointment-${appointment.status}`]"
                  ></div>
                  <span v-if="day.appointments.length > 3" class="more-appointments">
                    +{{ day.appointments.length - 3 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointments List -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Danh sách lịch hẹn</h3>
          <div class="header-actions">
            <input
              type="date"
              v-model="selectedDate"
              class="form-input form-input-sm"
            />
          </div>
        </div>
        <div class="card-body">
          <div class="appointments-list">
            <div
              v-for="appointment in filteredAppointments"
              :key="appointment.id"
              class="appointment-item"
            >
              <div class="appointment-time">
                <div class="time">{{ appointment.time }}</div>
                <div class="duration">{{ appointment.duration }} phút</div>
              </div>
              <div class="appointment-divider"></div>
              <div class="appointment-content">
                <div class="appointment-header">
                  <h4 class="patient-name">{{ appointment.patientName }}</h4>
                  <span :class="getBadgeClass(appointment.status)">
                    {{ getStatusText(appointment.status) }}
                  </span>
                </div>
                <div class="appointment-details">
                  <div class="detail-item">
                    <User />
                    <span>Bác sĩ: {{ appointment.doctor }}</span>
                  </div>
                  <div class="detail-item">
                    <Stethoscope />
                    <span>Dịch vụ: {{ appointment.service }}</span>
                  </div>
                  <div class="detail-item">
                    <Phone />
                    <span>{{ appointment.patientPhone }}</span>
                  </div>
                </div>
              </div>
              <div class="appointment-actions">
                <button class="btn btn-secondary btn-sm">Xem</button>
                <button class="btn btn-secondary btn-sm">Sửa</button>
                <button class="btn btn-danger btn-sm">Hủy</button>
              </div>
            </div>
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
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
  Stethoscope,
  Phone
} from 'lucide-vue-next'
import { appointmentsData } from '@/data'

const activeFilter = ref('all')
const selectedDate = ref(new Date().toISOString().split('T')[0])
const currentMonth = ref(new Date())
const appointments = ref(appointmentsData)

const filterTabs = [
  { value: 'all', label: 'Tất cả' },
  { value: 'today', label: 'Hôm nay' },
  { value: 'week', label: 'Tuần này' },
  { value: 'month', label: 'Tháng này' }
]

const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

const filteredAppointments = computed(() => {
  let filtered = appointments.value

  if (selectedDate.value) {
    filtered = filtered.filter(apt => apt.date === selectedDate.value)
  }

  if (activeFilter.value !== 'all') {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    
    switch (activeFilter.value) {
      case 'today':
        filtered = filtered.filter(apt => apt.date === todayStr)
        break
      case 'week':
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        filtered = filtered.filter(apt => {
          const aptDate = new Date(apt.date)
          return aptDate >= weekStart && aptDate <= weekEnd
        })
        break
      case 'month':
        filtered = filtered.filter(apt => {
          const aptDate = new Date(apt.date)
          return aptDate.getMonth() === today.getMonth() && 
                 aptDate.getFullYear() === today.getFullYear()
        })
        break
    }
  }

  return filtered.sort((a, b) => a.time.localeCompare(b.time))
})

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    
    const dateStr = currentDate.toISOString().split('T')[0]
    const dayAppointments = appointments.value.filter(apt => apt.date === dateStr)
    
    days.push({
      date: dateStr,
      day: currentDate.getDate(),
      isToday: currentDate.toDateString() === today.toDateString(),
      isOtherMonth: currentDate.getMonth() !== month,
      appointments: dayAppointments
    })
  }
  
  return days
})

const getCurrentMonth = () => {
  return currentMonth.value.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })
}

const previousMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1)
}

const nextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1)
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
</script>

<style scoped>
.appointments-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 0.375rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.tab-btn {
  padding: 0.625rem 1.25rem;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.8125rem;
  font-weight: 500;
  position: relative;
}

.tab-btn:hover {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  color: var(--text-primary);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.tab-btn-active {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border-color: #3b82f6;
  font-weight: 600;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
}

.calendar-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.current-month {
  font-weight: 600;
  color: var(--text-primary);
  min-width: 150px;
  text-align: center;
}

.calendar-grid {
  margin-top: 1rem;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-bottom: none;
}

.weekday {
  background: var(--surface);
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-top: none;
}

.calendar-day {
  background: var(--background);
  padding: 0.5rem;
  min-height: 80px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.calendar-day:hover {
  background: var(--surface);
}

.calendar-day-today {
  background: #eff6ff;
}

.calendar-day-other-month {
  opacity: 0.5;
}

.day-number {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.day-appointments {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  align-items: center;
}

.appointment-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.appointment-confirmed {
  background-color: var(--success-color);
}

.appointment-pending {
  background-color: var(--warning-color);
}

.appointment-cancelled {
  background-color: var(--danger-color);
}

.more-appointments {
  font-size: 0.625rem;
  color: var(--text-secondary);
  margin-left: 2px;
}

.form-input-sm {
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
}

.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.appointment-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--background);
  transition: box-shadow 0.2s;
}

.appointment-item:hover {
  box-shadow: var(--shadow-md);
}

.appointment-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.time {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-color);
}

.duration {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.appointment-divider {
  width: 1px;
  background: var(--border);
}

.appointment-content {
  flex: 1;
}

.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.patient-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.appointment-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.appointment-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

@media (max-width: 768px) {
  .header-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-tabs {
    justify-content: center;
  }
  
  .appointment-item {
    flex-direction: column;
  }
  
  .appointment-divider {
    width: 100%;
    height: 1px;
  }
  
  .appointment-actions {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
