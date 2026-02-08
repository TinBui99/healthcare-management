export const dashboardStats = {
  totalPatients: 1248,
  todayAppointments: 24,
  monthlyRevenue: 285000000,
  pendingTasks: 12
}

export const weeklyChartData = [
  { day: 'T2', appointments: 12 },
  { day: 'T3', appointments: 18 },
  { day: 'T4', appointments: 8 },
  { day: 'T5', appointments: 22 },
  { day: 'T6', appointments: 15 },
  { day: 'T7', appointments: 20 },
  { day: 'CN', appointments: 10 }
]

export const monthlyChartData = [
  { day: '1', appointments: 15 },
  { day: '5', appointments: 22 },
  { day: '10', appointments: 18 },
  { day: '15', appointments: 25 },
  { day: '20', appointments: 30 },
  { day: '25', appointments: 28 },
  { day: '30', appointments: 20 }
]

export const quarterlyChartData = [
  { month: 'T10', appointments: 180 },
  { month: 'T11', appointments: 220 },
  { month: 'T12', appointments: 195 },
  { month: 'T1', appointments: 210 }
]

export const quickActions = [
  { id: 1, label: 'Thêm bệnh nhân mới', icon: 'Plus', route: '/patients/new' },
  { id: 2, label: 'Đặt lịch hẹn', icon: 'Calendar', route: '/appointments/new' },
  { id: 3, label: 'Tạo hồ sơ bệnh án', icon: 'FileText', route: '/medical-records/new' },
  { id: 4, label: 'Thanh toán', icon: 'CreditCard', route: '/billing/new' }
]
