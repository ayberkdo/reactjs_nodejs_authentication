import sequelize, { testConnection, syncDatabase } from "../config/database.js";
import { seedDatabase } from "../database/seeders/userSeeder.js";
import "../database/models/User.js"; // Import models to register them

export const initializeDatabase = async (force = false) => {
  console.log("🚀 Initializing database...");

  try {
    // Test connection
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error("Database connection failed");
    }

    // Sync database (create tables)
    const isSynced = await syncDatabase(force);
    if (!isSynced) {
      throw new Error("Database synchronization failed");
    }

    // Seed database with default data
    await seedDatabase();

    console.log("✅ Database initialization completed successfully");
    return true;
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    return false;
  }
};

export const closeDatabase = async () => {
  try {
    await sequelize.close();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error closing database:", error.message);
  }
};

export default { initializeDatabase, closeDatabase };
