<template>
  <div class="main-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <Heart class="logo-icon" />
          <span v-if="!sidebarCollapsed" class="logo-text">HealthCare</span>
        </div>
        <button v-if="!sidebarCollapsed" @click="toggleSidebar" class="sidebar-toggle">
          <Menu />
        </button>
        <button v-else @click="toggleSidebar" class="sidebar-expand-btn">
          <ChevronRight />
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="nav-item"
          :class="{ 'nav-item-active': $route.name === item.name }"
        >
          <component :is="item.icon" class="nav-icon" />
          <span v-if="!sidebarCollapsed" class="nav-text">{{ item.label }}</span>
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <h1 class="page-title">{{ pageTitle }}</h1>
        </div>
        <div class="header-right">
          <div class="notification-wrapper">
            <button @click="toggleNotifications" class="btn btn-secondary btn-sm">
              <Bell />
              <span class="notification-badge">{{ unreadCount }}</span>
            </button>
            
            <!-- Notifications Dropdown -->
            <div v-if="showNotifications" class="notifications-dropdown" @click.stop>
              <div class="notifications-header">
                <h3>Thông báo</h3>
                <button @click="markAllAsRead" class="mark-all-read-btn">
                  Đánh dấu đã đọc tất cả
                </button>
              </div>
              <div class="notifications-list">
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  :class="['notification-item', { 'notification-unread': !notification.read }]"
                  @click="markAsRead(notification.id)"
                >
                  <div :class="['notification-icon', `notification-${notification.color}`]">
                    <component :is="getNotificationIcon(notification.icon)" />
                  </div>
                  <div class="notification-content">
                    <div class="notification-title">{{ notification.title }}</div>
                    <div class="notification-message">{{ notification.message }}</div>
                    <div class="notification-time">{{ notification.time }}</div>
                  </div>
                  <button @click.stop="removeNotification(notification.id)" class="notification-remove">
                    <X />
                  </button>
                </div>
              </div>
              <div class="notifications-footer">
                <a href="#" class="view-all-link">Xem tất cả thông báo</a>
              </div>
            </div>
          </div>
          
          <div class="user-menu" @click="toggleUserMenu">
            <div class="user-avatar">
              <User />
            </div>
            <div class="user-info">
              <div class="user-name">Dr. Nguyễn Văn A</div>
              <div class="user-role">Quản trị viên</div>
            </div>
          </div>
          
          <!-- User Popup Menu -->
          <div v-if="showUserMenu" class="user-popup" @click.stop>
            <div class="popup-header">
              <div class="popup-avatar">
                <User />
              </div>
              <div class="popup-info">
                <div class="popup-name">Dr. Nguyễn Văn A</div>
                <div class="popup-email">nguyenvana@healthcare.com</div>
                <div class="popup-role">Quản trị viên</div>
              </div>
            </div>
            <div class="popup-menu">
              <a href="#" class="popup-menu-item">
                <User />
                <span>Hồ sơ cá nhân</span>
              </a>
              <a href="#" class="popup-menu-item">
                <Settings />
                <span>Cài đặt</span>
              </a>
              <a href="#" class="popup-menu-item">
                <LogOut />
                <span>Đăng xuất</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  Heart,
  Menu,
  ChevronRight,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  CreditCard,
  Bell,
  User,
  Settings,
  LogOut,
  X,
  AlertCircle
} from 'lucide-vue-next'

const route = useRoute()
const sidebarCollapsed = ref(false)
const showUserMenu = ref(false)
const showNotifications = ref(false)

// Import notifications data
import { notificationsData } from '@/data'

const notifications = ref(notificationsData)

// Computed properties
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const menuItems = [
  { name: 'Dashboard', path: '/', label: 'Tổng quan', icon: LayoutDashboard },
  { name: 'Patients', path: '/patients', label: 'Bệnh nhân', icon: Users },
  { name: 'Appointments', path: '/appointments', label: 'Lịch hẹn', icon: Calendar },
  { name: 'MedicalRecords', path: '/medical-records', label: 'Hồ sơ bệnh án', icon: FileText },
  { name: 'Billing', path: '/billing', label: 'Thanh toán', icon: CreditCard }
]

const pageTitle = computed(() => {
  const currentItem = menuItems.find(item => item.name === route.name)
  return currentItem ? currentItem.label : 'Dashboard'
})

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

const getNotificationIcon = (iconName) => {
  const icons = {
    Calendar,
    User,
    CreditCard,
    AlertCircle
  }
  return icons[iconName] || Bell
}

// Close menus when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu') && !e.target.closest('.user-popup')) {
      showUserMenu.value = false
    }
    if (!e.target.closest('.notification-wrapper') && !e.target.closest('.notifications-dropdown')) {
      showNotifications.value = false
    }
  })
})
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  background-color: var(--surface);
}

.sidebar {
  width: 250px;
  background: var(--background);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: relative;
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-collapsed:hover .nav-text {
  opacity: 1;
  width: auto;
  overflow: visible;
}

.sidebar-collapsed:hover .logo-text {
  opacity: 1;
  width: auto;
  overflow: visible;
}

.sidebar-collapsed:hover .sidebar-toggle {
  opacity: 1;
  width: auto;
  overflow: visible;
  padding: 0.5rem;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: var(--primary-color);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.sidebar-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius);
  color: var(--text-secondary);
  transition: color 0.2s;
}

.sidebar-toggle:hover {
  color: var(--text-primary);
  background-color: var(--surface);
}

.sidebar-collapsed .sidebar-toggle {
  opacity: 0;
  width: 0;
  overflow: hidden;
  padding: 0;
}

.sidebar-expand-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius);
  color: var(--text-secondary);
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-expand-btn:hover {
  color: var(--text-primary);
  background-color: var(--surface);
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s;
  gap: 0.75rem;
  margin: 0 0.5rem;
  border-radius: var(--radius);
}

.nav-item:hover {
  background-color: var(--surface);
  color: var(--text-primary);
}

.nav-item-active {
  background-color: var(--primary-color);
  color: white;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-text {
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.3s;
}

.sidebar-collapsed .nav-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.sidebar-collapsed .logo-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  background: var(--background);
  border-bottom: 1px solid var(--border);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.notification-wrapper {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: var(--danger-color);
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-menu:hover {
  background-color: var(--surface);
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  text-align: right;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.user-role {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* User Popup Styles */
.user-popup {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  min-width: 280px;
  z-index: 1000;
  margin-top: 0.5rem;
  overflow: hidden;
}

.popup-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.popup-avatar {
  width: 48px;
  height: 48px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.popup-email {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.popup-role {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.popup-menu {
  padding: 0.5rem;
}

.popup-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: calc(var(--radius) - 2px);
  transition: background-color 0.2s;
  font-size: 0.875rem;
}

.popup-menu-item:hover {
  background-color: var(--surface);
}

.popup-menu-item svg {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
}

/* Notifications Dropdown Styles */
.notifications-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  width: 380px;
  max-height: 480px;
  z-index: 1000;
  margin-top: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.notifications-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notifications-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.mark-all-read-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.mark-all-read-btn:hover {
  background-color: var(--surface);
}

.notifications-list {
  flex: 1;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.notification-item:hover {
  background-color: var(--surface);
}

.notification-unread {
  background-color: #f8fafc;
}

.notification-unread::before {
  content: '';
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background-color: var(--primary-color);
  border-radius: 50%;
}

.notification-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification-icon svg {
  width: 18px;
  height: 18px;
  color: white;
}

.notification-blue {
  background-color: #3b82f6;
}

.notification-green {
  background-color: #10b981;
}

.notification-yellow {
  background-color: #f59e0b;
}

.notification-purple {
  background-color: #8b5cf6;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.notification-message {
  color: var(--text-secondary);
  font-size: 0.8125rem;
  line-height: 1.4;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notification-time {
  color: var(--text-secondary);
  font-size: 0.75rem;
}

.notification-remove {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  opacity: 0;
  transition: all 0.2s;
}

.notification-item:hover .notification-remove {
  opacity: 1;
}

.notification-remove:hover {
  color: var(--danger-color);
  background-color: #fee2e2;
}

.notifications-footer {
  padding: 0.75rem 1.5rem;
  border-top: 1px solid var(--border);
  text-align: center;
}

.view-all-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.view-all-link:hover {
  text-decoration: underline;
}

.content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
  }
  
  .sidebar:not(.sidebar-collapsed) {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .header-right .user-info {
    display: none;
  }
}
</style>
