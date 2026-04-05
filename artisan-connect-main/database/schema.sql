-- ============================================================
-- قاعدة بيانات منصة "حِرَفي" - Artisan Connect
-- MySQL - مناسبة لـ Hostinger
-- ============================================================

CREATE DATABASE IF NOT EXISTS hirafi_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hirafi_db;

-- ============================================================
-- 1. جدول المستخدمين (users)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL,
  email         VARCHAR(150)  NOT NULL UNIQUE,
  phone         VARCHAR(20)   DEFAULT NULL,
  password_hash VARCHAR(255)  NOT NULL,
  role          ENUM('client','artisan','admin') NOT NULL DEFAULT 'client',
  avatar_url    VARCHAR(500)  DEFAULT NULL,
  is_active     TINYINT(1)    NOT NULL DEFAULT 1,
  email_verified_at DATETIME  DEFAULT NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. جدول الفئات / التصنيفات (categories)
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(80)  NOT NULL UNIQUE,
  icon       VARCHAR(50)  DEFAULT NULL,   -- اسم أيقونة lucide-react
  artisan_count INT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. جدول الحرفيين (artisans)
-- ============================================================
CREATE TABLE IF NOT EXISTS artisans (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id         INT UNSIGNED NOT NULL,
  category_id     INT UNSIGNED NOT NULL,
  specialty       VARCHAR(100) NOT NULL,
  bio             TEXT         DEFAULT NULL,
  experience_years TINYINT UNSIGNED NOT NULL DEFAULT 0,
  location        VARCHAR(100) DEFAULT NULL,
  rating          DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  review_count    INT UNSIGNED NOT NULL DEFAULT 0,
  is_featured     TINYINT(1)   NOT NULL DEFAULT 0,
  is_verified     TINYINT(1)   NOT NULL DEFAULT 0,
  is_available    TINYINT(1)   NOT NULL DEFAULT 1,
  created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_artisan_user     FOREIGN KEY (user_id)     REFERENCES users(id)      ON DELETE CASCADE,
  CONSTRAINT fk_artisan_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 4. جدول الخدمات لكل حرفي (services)
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  artisan_id  INT UNSIGNED NOT NULL,
  name        VARCHAR(150) NOT NULL,
  description TEXT         DEFAULT NULL,
  price_label VARCHAR(80)  DEFAULT NULL,   -- مثال: "150 ريال/ساعة"
  price_min   DECIMAL(10,2) DEFAULT NULL,
  price_max   DECIMAL(10,2) DEFAULT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_service_artisan FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 5. جدول التقييمات (reviews)
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  artisan_id  INT UNSIGNED NOT NULL,
  client_id   INT UNSIGNED NOT NULL,
  rating      TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT         DEFAULT NULL,
  is_approved TINYINT(1)   NOT NULL DEFAULT 1,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uq_one_review_per_client (artisan_id, client_id),
  CONSTRAINT fk_review_artisan FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE,
  CONSTRAINT fk_review_client  FOREIGN KEY (client_id)  REFERENCES users(id)    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 6. جدول طلبات التواصل / الحجوزات (contact_requests)
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_requests (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  artisan_id  INT UNSIGNED NOT NULL,
  client_name VARCHAR(100) NOT NULL,
  client_phone VARCHAR(20) NOT NULL,
  client_email VARCHAR(150) DEFAULT NULL,
  message     TEXT         NOT NULL,
  status      ENUM('pending','seen','replied','closed') NOT NULL DEFAULT 'pending',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_request_artisan FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 7. جدول الرسائل بين الحرفي والعميل (messages)
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sender_id   INT UNSIGNED NOT NULL,
  receiver_id INT UNSIGNED NOT NULL,
  body        TEXT         NOT NULL,
  is_read     TINYINT(1)   NOT NULL DEFAULT 0,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_msg_sender   FOREIGN KEY (sender_id)   REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_msg_receiver FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 8. جدول معرض أعمال الحرفي (portfolio)
-- ============================================================
CREATE TABLE IF NOT EXISTS portfolio_items (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  artisan_id  INT UNSIGNED NOT NULL,
  image_url   VARCHAR(500) NOT NULL,
  title       VARCHAR(150) DEFAULT NULL,
  description TEXT         DEFAULT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_portfolio_artisan FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 9. جدول الإشعارات (notifications)
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     INT UNSIGNED NOT NULL,
  type        VARCHAR(50)  NOT NULL,  -- مثال: 'new_review', 'new_request'
  content     TEXT         NOT NULL,
  is_read     TINYINT(1)   NOT NULL DEFAULT 0,
  url         VARCHAR(300) DEFAULT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 10. جدول رموز إعادة تعيين كلمة المرور
-- ============================================================
CREATE TABLE IF NOT EXISTS password_resets (
  email      VARCHAR(150) NOT NULL,
  token      VARCHAR(255) NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- الفهارس (Indexes) لتسريع الاستعلامات
-- ============================================================
CREATE INDEX idx_artisans_category  ON artisans(category_id);
CREATE INDEX idx_artisans_rating    ON artisans(rating DESC);
CREATE INDEX idx_artisans_location  ON artisans(location);
CREATE INDEX idx_artisans_verified  ON artisans(is_verified);
CREATE INDEX idx_artisans_featured  ON artisans(is_featured);
CREATE INDEX idx_reviews_artisan    ON reviews(artisan_id);
CREATE INDEX idx_messages_sender    ON messages(sender_id);
CREATE INDEX idx_messages_receiver  ON messages(receiver_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);

-- ============================================================
-- بيانات أولية (Seed Data) - التصنيفات
-- ============================================================
INSERT INTO categories (name, icon, artisan_count) VALUES
  ('كهربائي',  'Zap',        128),
  ('سباك',     'Wrench',      95),
  ('نجار',     'Hammer',      76),
  ('دهان',     'Paintbrush', 112),
  ('بناء',     'Building2',   64),
  ('حداد',     'Shield',      43),
  ('مكيفات',   'Wind',        87),
  ('بلاط',     'LayoutGrid',  55);

-- ============================================================
-- بيانات تجريبية - مستخدمون
-- ============================================================
-- كلمات المرور هنا: "password123" - يجب تشفيرها في الكود (bcrypt)
INSERT INTO users (name, email, phone, password_hash, role) VALUES
  ('أدمن النظام',   'admin@hirafi.sa',   '+966500000000', '$2y$10$placeholderAdminHash',   'admin'),
  ('أحمد بن محمد',  'ahmed@example.com', '+966501234567', '$2y$10$placeholderHash1',       'artisan'),
  ('محمد العلي',    'mohamed@example.com','+966507654321', '$2y$10$placeholderHash2',      'artisan'),
  ('خالد الشمري',   'khaled@example.com','+966509876543', '$2y$10$placeholderHash3',       'artisan'),
  ('عبدالله الحربي','abdullah@example.com','+966502345678','$2y$10$placeholderHash4',     'artisan'),
  ('فهد القحطاني',  'fahd@example.com',  '+966508765432', '$2y$10$placeholderHash5',       'artisan'),
  ('سعد الدوسري',   'saad@example.com',  '+966503456789', '$2y$10$placeholderHash6',       'artisan'),
  ('عمر الفهد',     'omar@example.com',  '+966511111111', '$2y$10$placeholderHash7',       'client'),
  ('سلطان المالكي', 'sultan@example.com','+966522222222', '$2y$10$placeholderHash8',       'client');

-- ============================================================
-- بيانات تجريبية - حرفيون
-- ============================================================
INSERT INTO artisans (user_id, category_id, specialty, bio, experience_years, location, rating, review_count, is_featured, is_verified) VALUES
  (2, 1, 'كهربائي',   'كهربائي محترف بخبرة تزيد عن 12 سنة في جميع أعمال الكهرباء المنزلية والتجارية. معتمد ومرخص.', 12, 'الرياض',  4.90, 142, 1, 1),
  (3, 2, 'سباك',     'متخصص في جميع أعمال السباكة والصرف الصحي. خدمة سريعة وموثوقة على مدار الساعة.',             8,  'جدة',    4.70, 98,  1, 1),
  (4, 3, 'نجار',     'نجار متميز متخصص في الأثاث المنزلي والمطابخ. تصاميم عصرية وخامات عالية الجودة.',            15, 'الدمام', 4.80, 76,  1, 0),
  (5, 4, 'دهان',     'فنان دهان محترف. متخصص في الدهانات الديكورية والجرافيت والورق الجدران.',                     10, 'مكة',    4.60, 54,  0, 1),
  (6, 7, 'مكيفات',   'خبير في تركيب وصيانة جميع أنواع المكيفات. خدمة طوارئ على مدار الساعة.',                    14, 'الرياض', 4.90, 200, 1, 1),
  (7, 8, 'بلاط',     'متخصص في تركيب جميع أنواع البلاط والسيراميك والرخام بدقة عالية.',                          7,  'الخبر',  4.50, 38,  0, 1);

-- ============================================================
-- بيانات تجريبية - الخدمات
-- ============================================================
INSERT INTO services (artisan_id, name, price_label) VALUES
  (1, 'تمديدات كهربائية',  '150 ريال/ساعة'),
  (1, 'صيانة لوحات التحكم','200 ريال'),
  (1, 'تركيب إضاءة',       '100 ريال'),
  (2, 'إصلاح تسريبات',     '120 ريال'),
  (2, 'تركيب أدوات صحية',  '180 ريال'),
  (2, 'صيانة شبكات المياه', '250 ريال'),
  (3, 'تصنيع مطابخ',       'من 5000 ريال'),
  (3, 'أثاث مخصص',         'حسب الطلب'),
  (3, 'صيانة أبواب',        '150 ريال'),
  (4, 'دهان غرفة',          'من 800 ريال'),
  (4, 'ورق جدران',          'من 500 ريال'),
  (4, 'دهان خارجي',         'حسب المساحة'),
  (5, 'تركيب مكيف سبليت',  '350 ريال'),
  (5, 'صيانة دورية',        '150 ريال'),
  (5, 'غسيل مكيفات',        '100 ريال'),
  (6, 'تركيب بلاط',         '40 ريال/م²'),
  (6, 'رخام',               '80 ريال/م²'),
  (6, 'بورسلان',             '50 ريال/م²');

-- ============================================================
-- بيانات تجريبية - التقييمات
-- ============================================================
INSERT INTO reviews (artisan_id, client_id, rating, comment) VALUES
  (1, 8, 5, 'عمل ممتاز واحترافي. أنصح به بشدة!'),
  (1, 9, 5, 'سريع وأمين. أفضل كهربائي تعاملت معه.'),
  (2, 8, 4, 'خدمة جيدة وسعر مناسب.'),
  (3, 9, 5, 'مطبخ رائع بتصميم عصري. شغل نظيف جداً.'),
  (5, 8, 5, 'صيانة مكيف ممتازة. جاء في الموعد بالضبط.');

-- ============================================================
-- Trigger: تحديث rating و review_count تلقائياً عند إضافة تقييم
-- ============================================================
DELIMITER $$

CREATE TRIGGER after_review_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
  UPDATE artisans
  SET
    rating       = (SELECT ROUND(AVG(rating), 2) FROM reviews WHERE artisan_id = NEW.artisan_id AND is_approved = 1),
    review_count = (SELECT COUNT(*) FROM reviews WHERE artisan_id = NEW.artisan_id AND is_approved = 1)
  WHERE id = NEW.artisan_id;
END$$

CREATE TRIGGER after_review_update
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
  UPDATE artisans
  SET
    rating       = (SELECT ROUND(AVG(rating), 2) FROM reviews WHERE artisan_id = NEW.artisan_id AND is_approved = 1),
    review_count = (SELECT COUNT(*) FROM reviews WHERE artisan_id = NEW.artisan_id AND is_approved = 1)
  WHERE id = NEW.artisan_id;
END$$

CREATE TRIGGER after_review_delete
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
  UPDATE artisans
  SET
    rating       = COALESCE((SELECT ROUND(AVG(rating), 2) FROM reviews WHERE artisan_id = OLD.artisan_id AND is_approved = 1), 0),
    review_count = (SELECT COUNT(*) FROM reviews WHERE artisan_id = OLD.artisan_id AND is_approved = 1)
  WHERE id = OLD.artisan_id;
END$$

-- Trigger: تحديث artisan_count في categories
CREATE TRIGGER after_artisan_insert
AFTER INSERT ON artisans
FOR EACH ROW
BEGIN
  UPDATE categories SET artisan_count = artisan_count + 1 WHERE id = NEW.category_id;
END$$

CREATE TRIGGER after_artisan_delete
AFTER DELETE ON artisans
FOR EACH ROW
BEGIN
  UPDATE categories SET artisan_count = GREATEST(artisan_count - 1, 0) WHERE id = OLD.category_id;
END$$

DELIMITER ;

-- ============================================================
-- Views مفيدة للاستعلام السريع
-- ============================================================

-- عرض: الحرفيون مع بيانات المستخدم والفئة
CREATE OR REPLACE VIEW v_artisans_full AS
SELECT
  a.id                AS artisan_id,
  u.name              AS artisan_name,
  u.email,
  u.phone,
  u.avatar_url,
  c.name              AS category_name,
  c.icon              AS category_icon,
  a.specialty,
  a.bio,
  a.experience_years,
  a.location,
  a.rating,
  a.review_count,
  a.is_featured,
  a.is_verified,
  a.is_available,
  a.created_at
FROM artisans a
JOIN users      u ON u.id = a.user_id
JOIN categories c ON c.id = a.category_id
WHERE u.is_active = 1;

-- عرض: الحرفيون المميزون
CREATE OR REPLACE VIEW v_featured_artisans AS
SELECT * FROM v_artisans_full
WHERE is_featured = 1 AND is_verified = 1
ORDER BY rating DESC;

-- عرض: آخر التقييمات مع اسم العميل والحرفي
CREATE OR REPLACE VIEW v_latest_reviews AS
SELECT
  r.id,
  r.rating,
  r.comment,
  r.created_at,
  u_client.name   AS client_name,
  u_artisan.name  AS artisan_name,
  a.id            AS artisan_id
FROM reviews r
JOIN users   u_client  ON u_client.id  = r.client_id
JOIN artisans a        ON a.id         = r.artisan_id
JOIN users   u_artisan ON u_artisan.id = a.user_id
WHERE r.is_approved = 1
ORDER BY r.created_at DESC;
