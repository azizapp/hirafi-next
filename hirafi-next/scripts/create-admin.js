/**
 * Script to create admin user with hashed password
 * Run: node scripts/create-admin.js
 */

const bcrypt = require('bcryptjs');

// Admin credentials
const adminEmail = 'admin@hirafi.com';
const adminPassword = 'admin123';
const adminName = 'مدير النظام';
const adminPhone = '+966500000000';

// Generate hash
const saltRounds = 10;
const passwordHash = bcrypt.hashSync(adminPassword, saltRounds);

console.log('========================================');
console.log('Admin User Credentials');
console.log('========================================');
console.log('Email:', adminEmail);
console.log('Password:', adminPassword);
console.log('Password Hash:', passwordHash);
console.log('========================================');
console.log('\nSQL to insert admin user:\n');

const sql = `INSERT INTO users (name, email, phone, password_hash, role, is_active) VALUES
('${adminName}', '${adminEmail}', '${adminPhone}', '${passwordHash}', 'admin', 1)
ON DUPLICATE KEY UPDATE password_hash = '${passwordHash}';`;

console.log(sql);
console.log('\n========================================');
