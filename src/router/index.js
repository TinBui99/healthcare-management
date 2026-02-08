import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Patients from '@/views/Patients.vue'
import Appointments from '@/views/Appointments.vue'
// import MedicalRecords from '@/views/MedicalRecords.vue'
// import Billing from '@/views/Billing.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: Appointments
  },
  // {
  //   path: '/medical-records',
  //   name: 'MedicalRecords',
  //   component: MedicalRecords
  // },
  // {
  //   path: '/billing',
  //   name: 'Billing',
  //   component: Billing
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
