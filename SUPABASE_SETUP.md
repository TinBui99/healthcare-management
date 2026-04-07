# Healthcare Management - Supabase Integration

## 🚀 Cài đặt Supabase

### 1. Tạo Supabase Project
1. Truy cập [supabase.com](https://supabase.com)
2. Create new project
3. Lưu lại **Project URL** và **Anon Key**

### 2. Cấu hình Environment Variables
Copy `.env.example` thành `.env.local`:

```bash
cp .env.example .env.local
```

Cập nhật thông tin trong `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Setup Database
Chạy SQL script trong Supabase Dashboard:

1. Vào Supabase Dashboard → SQL Editor
2. Copy và paste nội dung file `database/schema.sql`
3. Run script để tạo bảng patients

### 4. Cài đặt Dependencies

```bash
npm install
```

### 5. Chạy Development Server

```bash
npm run dev
```

## 📋 Database Schema

### Patients Table
```sql
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(10),
  address TEXT,
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  blood_type VARCHAR(10),
  allergies TEXT,
  medical_history TEXT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔐 Authentication

### Demo Account
- **Username**: admin
- **Password**: Admin@115

### Supabase Auth
Hệ thống hỗ trợ cả:
- **Mock Authentication** (cho demo)
- **Supabase Authentication** (khi có real users)

## 📝 Features

### ✅ Đã hoàn thành
- [x] Kết nối Supabase database
- [x] CRUD operations cho patients
- [x] Real-time data sync
- [x] Row Level Security (RLS)
- [x] Auto-generate patient codes
- [x] Error handling
- [x] Loading states

### 🔄 Backend Services
- **PatientService**: Quản lý bệnh nhân
- **AuthService**: Xác thực người dùng
- **Supabase Client**: Kết nối database

## 🚀 Deployment

### Environment Variables cho Production
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Vercel Deployment
1. Connect GitHub repo với Vercel
2. Add environment variables trong Vercel dashboard
3. Auto-deploy on push

## 🛠 Troubleshooting

### Common Issues
1. **CORS Error**: Kiểm tra Supabase settings
2. **Auth Error**: Verify environment variables
3. **Connection Error**: Check network và Supabase status

### Debug Mode
```javascript
// Trong browser console
localStorage.getItem('supabase.auth.token')
```

## 📚 Documentation
- [Supabase Docs](https://supabase.com/docs)
- [Vue 3 Docs](https://vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)
