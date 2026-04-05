-- =============================================
-- Hirafi Database Schema
-- =============================================

-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS hirafi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hirafi_db;

-- =============================================
-- جدول المستخدمين
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client', 'artisan') NOT NULL DEFAULT 'client',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- جدول التصنيفات
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(50) DEFAULT 'LayoutGrid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- جدول الحرفيين
-- =============================================
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_specialty (specialty),
    INDEX idx_location (location),
    INDEX idx_verified (verified),
    INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- جدول الخدمات
-- =============================================
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    craftsman_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (craftsman_id) REFERENCES craftsmen(id) ON DELETE CASCADE,
    INDEX idx_craftsman_id (craftsman_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- جدول التقييمات
-- =============================================
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    craftsman_id INT NOT NULL,
    user_id INT,
    user_name VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (craftsman_id) REFERENCES craftsmen(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_craftsman_id (craftsman_id),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- جدول رسائل التواصل
-- =============================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    craftsman_id INT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (craftsman_id) REFERENCES craftsmen(id) ON DELETE SET NULL,
    INDEX idx_craftsman_id (craftsman_id),
    INDEX idx_is_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- جدول الإعدادات
-- =============================================
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- إدراج البيانات الأولية
-- =============================================

-- إدراج التصنيفات
INSERT INTO categories (name, icon) VALUES
('كهربائي', 'Zap'),
('سباك', 'Wrench'),
('نجار', 'Hammer'),
('دهان', 'Paintbrush'),
('بناء', 'Building2'),
('حداد', 'Shield'),
('مكيفات', 'Wind'),
('بلاط', 'LayoutGrid');

-- إدراج مستخدم مدير افتراضي
-- كلمة المرور: admin123
INSERT INTO users (name, email, phone, password_hash, role, is_active) VALUES
('مدير النظام', 'admin@hirafi.com', '+966500000000', '$2a$10$rQZ9QxZQxZQxZQxZQxZQxOZ9QxZQxZQxZQxZQxZQxZQxZQxZQxZQ', 'admin', 1);

-- لكلمة مرور حقيقية، استخدم bcrypt لتوليد الـ hash
-- مثال: admin123 -> $2a$10$YourBcryptHashHere

-- إدراج إعدادات افتراضية
INSERT INTO settings (setting_key, setting_value) VALUES
('site_name', 'حرفي'),
('site_description', 'منصة الحرفيين المعتمدين'),
('allow_registration', 'true'),
('maintenance_mode', 'false'),
('require_craftsman_approval', 'true');

-- =============================================
-- إنشاء إجراءات مخزنة (Stored Procedures)
-- =============================================

-- إجراء لتحديث تقييم الحرفي
DELIMITER //
CREATE PROCEDURE UpdateCraftsmanRating(IN p_craftsman_id INT)
BEGIN
    UPDATE craftsmen 
    SET rating = (
        SELECT COALESCE(AVG(rating), 0) 
        FROM reviews 
        WHERE craftsman_id = p_craftsman_id
    ),
    review_count = (
        SELECT COUNT(*) 
        FROM reviews 
        WHERE craftsman_id = p_craftsman_id
    )
    WHERE id = p_craftsman_id;
END //
DELIMITER ;

-- =============================================
-- إنشاء triggers
-- =============================================

-- Trigger لتحديث التقييم عند إضافة تقييم جديد
DELIMITER //
CREATE TRIGGER after_review_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    CALL UpdateCraftsmanRating(NEW.craftsman_id);
END //
DELIMITER ;

-- Trigger لتحديث التقييم عند حذف تقييم
DELIMITER //
CREATE TRIGGER after_review_delete
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
    CALL UpdateCraftsmanRating(OLD.craftsman_id);
END //
DELIMITER ;

-- =============================================
-- إنشاء View للإحصائيات
-- =============================================
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM users WHERE role = 'artisan') as total_craftsmen,
    (SELECT COUNT(*) FROM categories) as total_categories,
    (SELECT COUNT(*) FROM reviews) as total_reviews,
    (SELECT COUNT(*) FROM craftsmen WHERE verified = 0) as pending_verifications,
    (SELECT COUNT(*) FROM users WHERE created_at >= DATE_FORMAT(NOW(), '%Y-%m-01')) as new_users_this_month;
