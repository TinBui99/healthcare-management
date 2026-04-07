# Hệ thống Quản lý Y tế (Healthcare Management System)

Một hệ thống quản lý y tế hiện đại được xây dựng với Vue.js 3, cung cấp các công cụ quản lý bệnh nhân, lịch hẹn và thanh toán hiệu quả.

## 📋 Mục lục

- [Tổng quan](#-tổng-quan)
- [Tính năng](#-tính-năng)
- [Công nghệ](#-công-nghệ)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Cài đặt](#-cài-đặt)
- [Sử dụng](#-sử-dụng)
- [Modules hiện tại](#-modules-hiện-tại)
- [Modules phát triển](#-modules-phát-triển)
- [Giao diện](#-giao-diện)
- [Đóng góp](#-đóng-góp)

## 🌟 Tổng quan

Hệ thống Quản lý Y tế là một giải pháp toàn diện giúp các cơ sở y tế quản lý bệnh nhân, lịch hẹn và các hoạt động hàng ngày một cách hiệu quả. Với giao diện hiện đại và trực quan, hệ thống cung cấp trải nghiệm người dùng tuyệt vời cho cả nhân viên y tế và quản trị viên.

## ✨ Tính năng

### 🏥 Modules hiện tại

#### 1. Dashboard (Bảng điều khiển)
- **Thống kê tổng quan**: Tổng số bệnh nhân, lịch hẹn hôm nay, doanh thu tháng
- **Biểu đồ trực quan**: Biểu đồ lịch hẹn theo tuần/tháng/quý với tooltip tương tác
- **Thao tác nhanh**: Truy cập nhanh đến các chức năng chính
- **Thanh toán nhanh**: Xử lý thanh toán cho bệnh nhân

#### 2. Quản lý Bệnh nhân
- **Danh sách bệnh nhân**: Hiển thị thông tin chi tiết bệnh nhân
- **Thêm bệnh nhân mới**: Form popup với đầy đủ thông tin
- **Xem chi tiết**: Modal hiển thị toàn bộ thông tin bệnh nhân
- **Chỉnh sửa thông tin**: Cập nhật dữ liệu bệnh nhân
- **Tìm kiếm**: Tìm kiếm nhanh theo tên, mã, số điện thoại, email
- **Quản lý trạng thái**: Hoạt động/Không hoạt động với màu sắc phân biệt

#### 3. Quản lý Lịch hẹn
- **Lịch hẹn hôm nay**: Danh sách các cuộc hẹn trong ngày
- **Lọc theo trạng thái**: Đã xác nhận, Chờ xác nhận, Đã hủy
- **Quản lý lịch hẹn**: Thêm, sửa, xóa lịch hẹn
- **Giao diện trực quan**: Tabs lọc với thiết kế hiện đại

### 🚀 Modules đang phát triển

#### 4. Hồ sơ Bệnh án (Medical Records)
- **Tạo hồ sơ bệnh án**: Ghi chép thông tin khám bệnh
- **Lịch sử khám bệnh**: Theo dõi quá trình điều trị
- **Kết quả xét nghiệm**: Quản lý kết quả xét nghiệm, siêu âm
- **Đơn thuốc**: Quản lý kê đơn và lịch sử dùng thuốc
- **Chẩn đoán**: Lưu trữ chẩn đoán của bác sĩ

#### 5. Thanh toán (Billing)
- **Quản lý thanh toán**: Theo dõi các khoản thanh toán
- **Hóa đơn**: Tạo và quản lý hóa đơn dịch vụ
- **Báo cáo doanh thu**: Thống kê doanh thu theo thời gian
- **Phương thức thanh toán**: Hỗ trợ nhiều hình thức thanh toán
- **Công nợ**: Quản lý công nợ bệnh nhân

## 🛠 Công nghệ

### Frontend
- **Vue.js 3**: Framework JavaScript hiện đại với Composition API
- **Vite**: Build tool nhanh và hiệu quả
- **Lucide Vue Next**: Bộ icon hiện đại và đẹp mắt
- **CSS3**: Styling với CSS variables và responsive design

### Backend (Dự kiến)
- **Node.js**: Server-side JavaScript
- **Express.js**: Web framework
- **MongoDB**: Database cho dữ liệu y tế
- **JWT**: Authentication và authorization

## 📁 Cấu trúc dự án

```
healthcare-management/
├── public/                 # Static files
├── src/
│   ├── assets/           # CSS, images, fonts
│   │   ├── css/         # Stylesheets
│   │   ├── img/         # Images
│   │   └── scss/        # SCSS files
│   ├── components/      # Reusable components
│   │   ├── appointment/ # Appointment components
│   │   ├── billing/     # Billing components
│   │   └── common/      # Common components
│   ├── composables/     # Vue composables
│   ├── data/            # Mock data
│   ├── layouts/         # Layout components
│   │   └── components/  # Layout components
│   └── views/           # Page components
│       ├── Dashboard.vue
│       ├── Patients.vue
│       └── Appointments.vue
├── index.html           # Main HTML file
├── package.json         # Dependencies
└── README.md           # Project documentation
```

## 🚀 Cài đặt

### Yêu cầu
- Node.js 16.0 hoặc cao hơn
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**
   ```bash
   git clone https://github.com/your-username/healthcare-management.git
   cd healthcare-management
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. **Chạy development server**
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```

4. **Mở trình duyệt**
   Truy cập `http://localhost:5173` (hoặc port được hiển thị trong terminal)

## 📖 Sử dụng

### 1. Dashboard
- Xem thống kê tổng quan về bệnh nhân, lịch hẹn, doanh thu
- Sử dụng biểu đồ để theo dõi xu hướng lịch hẹn
- Truy cập nhanh các chức năng qua mục "Thao tác nhanh"

### 2. Quản lý Bệnh nhân
- **Thêm bệnh nhân**: Nhấn "Thêm bệnh nhân mới" và điền thông tin
- **Xem chi tiết**: Nhấn nút "Xem" để xem thông tin đầy đủ
- **Chỉnh sửa**: Nhấn nút "Sửa" để cập nhật thông tin
- **Tìm kiếm**: Sử dụng ô tìm kiếm để lọc bệnh nhân

### 3. Quản lý Lịch hẹn
- **Xem lịch hẹn**: Chọn tab trạng thái để lọc lịch hẹn
- **Quản lý**: Thêm, sửa, xóa các cuộc hẹn
- **Theo dõi**: Theo dõi trạng thái của từng cuộc hẹn

### 4. Thanh toán
- **Quick Payment**: Sử dụng nút "Thanh toán" trong Dashboard
- **Xử lý thanh toán**: Chọn bệnh nhân, dịch vụ, số tiền và phương thức
- **Cập nhật doanh thu**: Doanh thu sẽ tự động cập nhật sau thanh toán

## 🎯 Modules hiện tại

### ✅ Dashboard
- [x] Thống kê tổng quan
- [x] Biểu đồ lịch hẹn tương tác
- [x] Thao tác nhanh
- [x] Thanh toán nhanh

### ✅ Quản lý Bệnh nhân
- [x] Danh sách bệnh nhân
- [x] Thêm/Sửa/Xóa bệnh nhân
- [x] Tìm kiếm và lọc
- [x] Modal popup cho CRUD operations
- [x] Responsive design

### ✅ Quản lý Lịch hẹn
- [x] Danh sách lịch hẹn
- [x] Lọc theo trạng thái
- [x] Giao diện tabs hiện đại
- [x] Responsive design

## 🔮 Modules phát triển

### 📋 Hồ sơ Bệnh án (Medical Records)
- [ ] Tạo hồ sơ bệnh án mới
- [ ] Lịch sử khám bệnh
- [ ] Kết quả xét nghiệm
- [ ] Đơn thuốc và chẩn đoán
- [ ] In hồ sơ bệnh án

### 💰 Thanh toán (Billing)
- [ ] Quản lý hóa đơn chi tiết
- [ ] Báo cáo doanh thu
- [ ] Quản lý công nợ
- [ ] Xuất báo cáo Excel/PDF
- [ ] Tích hợp cổng thanh toán

### 📊 Báo cáo (Reports)
- [ ] Báo cáo bệnh nhân
- [ ] Báo cáo doanh thu
- [ ] Báo cáo dịch vụ
- [ ] Xuất báo cáo

### 🔐 Authentication
- [x] Đăng nhập/Đăng xuất
- [x] Quản lý người dùng
- [x] Phân quyền route
- [x] Bảo mật session
- [x] Trang 404/403 error handling

## 🎨 Giao diện

### Design Principles
- **Modern & Clean**: Thiết kế hiện đại, sạch sẽ
- **Responsive**: Tương thích trên mọi thiết bị
- **Intuitive**: Giao diện trực quan, dễ sử dụng
- **Consistent**: Thiết kế nhất quán toàn hệ thống

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Neutral**: Gray scale

### Features
- **Dark Mode Support**: Hỗ trợ chế độ tối
- **Smooth Animations**: Hiệu ứng chuyển động mượt mà
- **Interactive Charts**: Biểu đồ tương tác
- **Modal Popups**: Popup hiện đại cho CRUD operations

## 🤝 Đóng góp

Chúng tôi chào đón mọi đóng góp từ cộng đồng! Để đóng góp vào dự án:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push đến branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Hướng dẫn đóng góp
- Tuân thủ coding standards
- Thêm tests cho features mới
- Cập nhật documentation
- Sử dụng descriptive commit messages


## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Connect your GitHub repository to Vercel
   - Vercel will auto-detect Vite framework

2. **Build Configuration**
   - Build settings are configured in `vercel.json`
   - Auto-build on every push to main branch

3. **Environment Variables** (if needed)
   ```env
   VITE_API_BASE_URL=https://your-api-url.com
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to hosting**
   - Upload the `dist` folder to your hosting provider
   - Configure server to handle SPA routing

### Server Configuration

For production servers, configure routing fallback:

**Nginx Example:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache Example (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 📞 Liên hệ

- **Project Maintainer**: TinBui99
- **Email**: trongtin30899@gmail.com
- **GitHub**: (https://github.com/TinBui99)

## 🙏 Cảm ơn

Cảm ơn tất cả những người đã đóng góp vào dự án này!

---

**Lưu ý**: Đây là phiên bản demo với mock data. Trong môi trường production, hệ thống sẽ được tích hợp với backend API và database thực tế.
