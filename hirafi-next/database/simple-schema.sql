-- =============================================
-- Hirafi Database Schema (Simple Version)
-- بدون Foreign Keys لبساطة التشغيل
-- =============================================

-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS hirafi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hirafi_db;

-- جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client', 'artisan') NOT NULL DEFAULT 'client',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول التصنيفات
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(50) DEFAULT 'LayoutGrid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول الحرفيين
CREATE TABLE IF NOT EXISTS craftsmen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(50) NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    experience INT DEFAULT 0,
    location VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(150),
    bio TEXT,
    avatar VARCHAR(255) DEFAULT '',
    verified TINYINT(1) DEFAULT 0,
    featured TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول الخدمات
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    craftsman_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول التقييمات
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    craftsman_id INT NOT NULL,
    user_id INT,
    user_name VARCHAR(100) NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول رسائل التواصل
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    craftsman_id INT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول الإعدادات
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- إدراج التصنيفات
-- =============================================
INSERT INTO categories (name, icon) VALUES
('كهربائي', 'Zap'),
('سباك', 'Wrench'),
('نجار', 'Hammer'),
('دهان', 'Paintbrush'),
('بناء', 'Building2'),
('حداد', 'Shield'),
('مكيفات', 'Wind'),
('بلاط', 'LayoutGrid');

-- =============================================
-- إدراج مستخدم مدير
-- كلمة المرور: admin123
-- =============================================
INSERT INTO users (name, email, phone, password_hash, role, is_active) VALUES
('مدير النظام', 'admin@hirafi.com', '+966500000000', '$2a$10$YourBcryptHashHere', 'admin', 1);

-- =============================================
-- إدراج إعدادات افتراضية
-- =============================================
INSERT INTO settings (setting_key, setting_value) VALUES
('site_name', 'حرفي'),
('site_description', 'منصة الحرفيين المعتمدين'),
('allow_registration', 'true'),
('maintenance_mode', 'false');
