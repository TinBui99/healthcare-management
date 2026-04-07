-- Create patients table
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  address TEXT,
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  blood_type VARCHAR(10),
  allergies TEXT,
  medical_history TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_patients_code ON patients(code);
CREATE INDEX idx_patients_name ON patients(name);
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_phone ON patients(phone);
CREATE INDEX idx_patients_status ON patients(status);


-- Insert sample data (optional)
INSERT INTO patients (code, name, email, phone, date_of_birth, gender, address, emergency_contact_name, emergency_contact_phone, blood_type, status) VALUES
('BN001', 'Nguyễn Văn A', 'nguyenvana@email.com', '0901234567', '1980-01-15', 'male', '123 Nguyễn Huệ, Q.1, TP.HCM', 'Nguyễn Thị B', '0909876543', 'O+', 'active'),
('BN002', 'Trần Thị B', 'tranthib@email.com', '0912345678', '1985-05-20', 'female', '456 Lê Lợi, Q.3, TP.HCM', 'Trần Văn C', '0918765432', 'A+', 'active'),
('BN003', 'Lê Văn C', 'levanc@email.com', '0923456789', '1990-10-10', 'male', '789 Đồng Khởi, Q.5, TP.HCM', 'Lê Thị D', '0927654321', 'B+', 'inactive');
