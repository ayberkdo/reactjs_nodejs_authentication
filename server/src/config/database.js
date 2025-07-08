import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// MySQL Configuration
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || "reactjs_nodejs_auth_db",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log,
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true,
  },
});

// Test the connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connection established successfully (MySQL)`);
    return true;
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    return false;
  }
};

// Sync database (create tables)
export const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log("✅ Database synchronized successfully");
    return true;
  } catch (error) {
    console.error("❌ Error synchronizing database:", error.message);
    return false;
  }
};

export default sequelize;
