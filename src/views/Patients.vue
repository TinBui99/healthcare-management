<template>
  <MainLayout>
    <div class="patients-page">
      <!-- Header Actions -->
      <div class="page-header">
        <div class="header-actions">
          <button class="btn btn-primary" @click="showAddPatientModal = true">
            <Plus />
            Thêm bệnh nhân mới
          </button>
          <div class="search-box">
            <Search />
            <input
              type="text"
              placeholder="Tìm kiếm bệnh nhân..."
              v-model="searchQuery"
              class="form-input"
            />
          </div>
        </div>
      </div>

      <!-- Patients Table -->
      <div class="card">
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Mã bệnh nhân</th>
                <th>Họ tên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in filteredPatients" :key="patient.id">
                <td>{{ patient.code }}</td>
                <td>
                  <div class="patient-name-cell">
                    <div class="patient-avatar-small">
                      <User />
                    </div>
                    {{ patient.name }}
                  </div>
                </td>
                <td>{{ formatDate(patient.dateOfBirth) }}</td>
                <td>{{ patient.gender === 'male' ? 'Nam' : 'Nữ' }}</td>
                <td>{{ patient.phone }}</td>
                <td>{{ patient.email }}</td>
                <td>{{ patient.address }}</td>
                <td>
                  <span :class="getBadgeClass(patient.status)">
                    {{ getStatusText(patient.status) }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="btn btn-secondary btn-sm" @click="viewPatient(patient)">
                      <Eye />
                      Xem
                    </button>
                    <button class="btn btn-secondary btn-sm" @click="editPatient(patient)">
                      <Edit />
                      Sửa
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add Patient Modal -->
      <div v-if="showAddPatientModal" class="modal-overlay" @click="closeAddPatientModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Thêm bệnh nhân mới</h3>
            <button class="modal-close" @click="closeAddPatientModal">
              <X />
            </button>
          </div>
          
          <div class="modal-body">
            <form @submit.prevent="submitNewPatient" class="patient-form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Họ và tên *</label>
                  <input
                    type="text"
                    v-model="newPatient.name"
                    class="form-input"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Ngày sinh *</label>
                  <input
                    type="date"
                    v-model="newPatient.dateOfBirth"
                    class="form-input"
                    required
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Giới tính *</label>
                  <select v-model="newPatient.gender" class="form-select" required>
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Số điện thoại *</label>
                  <input
                    type="tel"
                    v-model="newPatient.phone"
                    class="form-input"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  v-model="newPatient.email"
                  class="form-input"
                  placeholder="Nhập email"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Địa chỉ</label>
                <textarea
                  v-model="newPatient.address"
                  class="form-textarea"
                  placeholder="Nhập địa chỉ"
                  rows="3"
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Ghi chú</label>
                <textarea
                  v-model="newPatient.notes"
                  class="form-textarea"
                  placeholder="Ghi chú về bệnh nhân"
                  rows="2"
                ></textarea>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeAddPatientModal">
              Hủy
            </button>
            <button type="submit" class="btn btn-primary" @click="submitNewPatient">
              <Plus />
              Lưu bệnh nhân
            </button>
          </div>
        </div>
      </div>

      <!-- View Patient Modal -->
      <div v-if="showViewPatientModal" class="modal-overlay" @click="closeViewPatientModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Chi tiết bệnh nhân</h3>
            <button class="modal-close" @click="closeViewPatientModal">
              <X />
            </button>
          </div>
          
          <div class="modal-body">
            <div class="patient-details">
              <div class="detail-header">
                <div class="patient-avatar-large">
                  <User />
                </div>
                <div class="patient-info">
                  <h4>{{ selectedPatient.name }}</h4>
                  <p class="patient-code">{{ selectedPatient.code }}</p>
                  <span :class="getBadgeClass(selectedPatient.status)">
                    {{ getStatusText(selectedPatient.status) }}
                  </span>
                </div>
              </div>

              <div class="detail-grid">
                <div class="detail-item">
                  <label class="detail-label">Ngày sinh</label>
                  <p class="detail-value">{{ formatDate(selectedPatient.dateOfBirth) }}</p>
                </div>
                <div class="detail-item">
                  <label class="detail-label">Giới tính</label>
                  <p class="detail-value">{{ selectedPatient.gender === 'male' ? 'Nam' : 'Nữ' }}</p>
                </div>
                <div class="detail-item">
                  <label class="detail-label">Số điện thoại</label>
                  <p class="detail-value">{{ selectedPatient.phone }}</p>
                </div>
                <div class="detail-item">
                  <label class="detail-label">Email</label>
                  <p class="detail-value">{{ selectedPatient.email || 'Chưa có' }}</p>
                </div>
                <div class="detail-item full-width">
                  <label class="detail-label">Địa chỉ</label>
                  <p class="detail-value">{{ selectedPatient.address || 'Chưa có' }}</p>
                </div>
                <div class="detail-item full-width">
                  <label class="detail-label">Lần khám cuối</label>
                  <p class="detail-value">{{ selectedPatient.lastVisit ? formatDate(selectedPatient.lastVisit) : 'Chưa có' }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeViewPatientModal">
              Đóng
            </button>
            <button class="btn btn-primary" @click="editPatient(selectedPatient)">
              <Edit />
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>

      <!-- Edit Patient Modal -->
      <div v-if="showEditPatientModal" class="modal-overlay" @click="closeEditPatientModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Chỉnh sửa bệnh nhân</h3>
            <button class="modal-close" @click="closeEditPatientModal">
              <X />
            </button>
          </div>
          
          <div class="modal-body">
            <form @submit.prevent="updatePatient" class="patient-form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Họ và tên *</label>
                  <input
                    type="text"
                    v-model="editingPatient.name"
                    class="form-input"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Ngày sinh *</label>
                  <input
                    type="date"
                    v-model="editingPatient.dateOfBirth"
                    class="form-input"
                    required
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Giới tính *</label>
                  <select v-model="editingPatient.gender" class="form-select" required>
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Số điện thoại *</label>
                  <input
                    type="tel"
                    v-model="editingPatient.phone"
                    class="form-input"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  v-model="editingPatient.email"
                  class="form-input"
                  placeholder="Nhập email"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Địa chỉ</label>
                <textarea
                  v-model="editingPatient.address"
                  class="form-textarea"
                  placeholder="Nhập địa chỉ"
                  rows="3"
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Trạng thái</label>
                <select v-model="editingPatient.status" class="form-select">
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeEditPatientModal">
              Hủy
            </button>
            <button type="submit" class="btn btn-primary" @click="updatePatient">
              <Edit />
              Cập nhật
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
import { Plus, Search, User, X, Eye, Edit } from 'lucide-vue-next'
import { patientsData } from '@/data'

const searchQuery = ref('')
const patients = ref(patientsData)
const showAddPatientModal = ref(false)
const showViewPatientModal = ref(false)
const showEditPatientModal = ref(false)

const newPatient = ref({
  name: '',
  dateOfBirth: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  notes: ''
})

const selectedPatient = ref({})
const editingPatient = ref({})

const filteredPatients = computed(() => {
  if (!searchQuery.value) return patients.value
  
  const query = searchQuery.value.toLowerCase()
  return patients.value.filter(patient =>
    patient.name.toLowerCase().includes(query) ||
    patient.code.toLowerCase().includes(query) ||
    patient.phone.includes(query) ||
    patient.email.toLowerCase().includes(query)
  )
})

const closeAddPatientModal = () => {
  showAddPatientModal.value = false
  resetNewPatient()
}

const resetNewPatient = () => {
  newPatient.value = {
    name: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  }
}

const submitNewPatient = () => {
  // Generate patient code
  const patientCode = 'BN' + String(patients.value.length + 1).padStart(4, '0')
  
  // Create new patient object
  const patient = {
    id: patients.value.length + 1,
    code: patientCode,
    name: newPatient.value.name,
    dateOfBirth: newPatient.value.dateOfBirth,
    gender: newPatient.value.gender,
    phone: newPatient.value.phone,
    email: newPatient.value.email || '',
    address: newPatient.value.address || '',
    status: 'active'
  }
  
  // Add to patients list
  patients.value.unshift(patient)
  
  // Close modal and reset form
  closeAddPatientModal()
  
  // Show success message (you could add a toast notification here)
  console.log('Bệnh nhân mới đã được thêm:', patient)
}

const viewPatient = (patient) => {
  selectedPatient.value = { ...patient }
  showViewPatientModal.value = true
}

const editPatient = (patient) => {
  editingPatient.value = { ...patient }
  showEditPatientModal.value = true
  closeViewPatientModal()
}

const closeViewPatientModal = () => {
  showViewPatientModal.value = false
  selectedPatient.value = {}
}

const closeEditPatientModal = () => {
  showEditPatientModal.value = false
  editingPatient.value = {}
}

const updatePatient = () => {
  // Find patient index
  const index = patients.value.findIndex(p => p.id === editingPatient.value.id)
  
  if (index !== -1) {
    // Update patient data
    patients.value[index] = { ...editingPatient.value }
    
    // Close modal and reset
    closeEditPatientModal()
    
    // Show success message
    console.log('Bệnh nhân đã được cập nhật:', editingPatient.value)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Chưa có'
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Chưa có'
    return date.toLocaleDateString('vi-VN')
  } catch (error) {
    return 'Chưa có'
  }
}

const getBadgeClass = (status) => {
  const classes = {
    active: 'badge badge-success',
    inactive: 'badge badge-danger'
  }
  return classes[status] || 'badge badge-secondary'
}

const getStatusText = (status) => {
  const texts = {
    active: 'Hoạt động',
    inactive: 'Không hoạt động'
  }
  return texts[status] || status
}
</script>

<style scoped>
.patients-page {
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

.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  min-width: 300px;
}

.search-box .form-input {
  border: none;
  padding: 0;
  outline: none;
  flex: 1;
}

.patient-name-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.patient-avatar-small {
  width: 32px;
  height: 32px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .header-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
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
  max-width: 600px;
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

.patient-form {
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

/* Patient Details Styles */
.patient-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.patient-avatar-large {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e2e8f0;
}

.patient-avatar-large svg {
  width: 40px;
  height: 40px;
  color: var(--text-secondary);
}

.patient-info h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.patient-code {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.detail-value {
  font-size: 0.9375rem;
  color: var(--text-primary);
  font-weight: 400;
  margin: 0;
}

@media (max-width: 768px) {
  .detail-header {
    flex-direction: column;
    text-align: center;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .patient-avatar-large {
    width: 60px;
    height: 60px;
  }
  
  .patient-avatar-large svg {
    width: 30px;
    height: 30px;
  }
}
</style>
