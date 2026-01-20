const db = require('../models');

async function createAdmin() {
  try {
    // Sync database
    await db.sequelize.sync();

    // Check if admin already exists
    const existingAdmin = await db.Admin.findOne({ where: { email: 'admin@lescracks.com' } });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Create admin
    const admin = await db.Admin.create({
      name: 'Administrator',
      email: 'admin@lescracks.com',
      password: 'lescracks2024'
    });

    console.log('Admin created successfully:', admin.toJSON());
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await db.sequelize.close();
  }
}

createAdmin();