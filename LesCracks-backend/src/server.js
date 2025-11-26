// src/server.js

require('dotenv').config();
const fs = require('fs');
const { sequelize } = require('./models');
const app = require('./app');

const PORT = process.env.PORT || 5000;

/* ===============================
   DATABASE INITIALIZATION
   =============================== */

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: false });
      console.log('Models synchronized with database');
    }

    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

/* ===============================
   SERVER STARTUP
   =============================== */

async function startServer() {
  try {
    const dbReady = await initializeDatabase();
    if (!dbReady) process.exit(1);

    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    app.listen(PORT, () => {
      console.log('===============================================');
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log('===============================================');
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

/* ===============================
   GRACEFUL SHUTDOWN
   =============================== */

process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing server...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing server...');
  await sequelize.close();
  process.exit(0);
});

startServer();
