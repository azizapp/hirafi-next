/**
 * Initialize Database Script
 * Creates all tables and inserts initial data
 * 
 * Run: node scripts/init-db.js
 */

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Load .env file manually
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    });
  }
}
loadEnv();

async function initDatabase() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT) || 3306,
  };

  console.log('🚀 Initializing database...');
  console.log('📡 Connecting to:', dbConfig.host, 'port:', dbConfig.port);
  console.log('👤 User:', dbConfig.user);
  console.log('');

  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log('📦 Creating database...');
    await connection.execute(
      "CREATE DATABASE IF NOT EXISTS hirafi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    );
    await connection.execute("USE hirafi_db");
    console.log('✅ Database created/selected\n');

    // Create tables
    console.log('📋 Creating tables...');

    // Users table
    await connection.execute(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ users');

    // Categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        icon VARCHAR(50) DEFAULT 'LayoutGrid',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ categories');

    // Craftsmen table
    await connection.execute(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ craftsmen');

    // Services table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        craftsman_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        price VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ services');

    // Reviews table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        craftsman_id INT NOT NULL,
        user_id INT,
        user_name VARCHAR(100) NOT NULL,
        rating INT NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ reviews');

    // Contact messages table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        craftsman_id INT,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        is_read TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ contact_messages');

    // Settings table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) NOT NULL UNIQUE,
        setting_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ settings\n');

    // Insert categories
    console.log('📁 Inserting categories...');
    const [existingCategories] = await connection.execute('SELECT COUNT(*) as count FROM categories');
    if (existingCategories[0].count === 0) {
      await connection.execute(`
        INSERT INTO categories (name, icon) VALUES
        ('كهربائي', 'Zap'),
        ('سباك', 'Wrench'),
        ('نجار', 'Hammer'),
        ('دهان', 'Paintbrush'),
        ('بناء', 'Building2'),
        ('حداد', 'Shield'),
        ('مكيفات', 'Wind'),
        ('بلاط', 'LayoutGrid')
      `);
      console.log('✅ Categories inserted\n');
    } else {
      console.log('⏭️  Categories already exist\n');
    }

    // Insert admin user
    console.log('👤 Creating admin user...');
    const [existingAdmin] = await connection.execute(
      'SELECT COUNT(*) as count FROM users WHERE role = "admin"'
    );
    
    if (existingAdmin[0].count === 0) {
      const passwordHash = bcrypt.hashSync('admin123', 10);
      await connection.execute(`
        INSERT INTO users (name, email, phone, password_hash, role, is_active) VALUES
        ('مدير النظام', 'admin@hirafi.com', '+966500000000', ?, 'admin', 1)
      `, [passwordHash]);
      console.log('✅ Admin user created');
      console.log('   Email: admin@hirafi.com');
      console.log('   Password: admin123\n');
    } else {
      console.log('⏭️  Admin user already exists\n');
    }

    // Insert settings
    console.log('⚙️  Inserting settings...');
    const [existingSettings] = await connection.execute('SELECT COUNT(*) as count FROM settings');
    if (existingSettings[0].count === 0) {
      await connection.execute(`
        INSERT INTO settings (setting_key, setting_value) VALUES
        ('site_name', 'حرفي'),
        ('site_description', 'منصة الحرفيين المعتمدين'),
        ('allow_registration', 'true'),
        ('maintenance_mode', 'false')
      `);
      console.log('✅ Settings inserted\n');
    } else {
      console.log('⏭️  Settings already exist\n');
    }

    console.log('========================================');
    console.log('🎉 Database initialization complete!');
    console.log('========================================');
    console.log('\nAdmin Login Credentials:');
    console.log('  Email: admin@hirafi.com');
    console.log('  Password: admin123');
    console.log('  URL: http://localhost:3000/admin/login');
    console.log('========================================\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

initDatabase().catch(console.error);
