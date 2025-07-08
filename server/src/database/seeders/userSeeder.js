import User from "../models/User.js";

export const seedUsers = async () => {
  try {
    // Check if users already exist
    const existingUsersCount = await User.count();

    if (existingUsersCount > 0) {
      console.log("👥 Users already exist, skipping seed...");
      return;
    }

    // Create default users
    const defaultUsers = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      },
      {
        name: "Regular User",
        email: "user@example.com",
        password: "password123",
        role: "user",
      },
      {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "user",
      },
    ];

    await User.bulkCreate(defaultUsers);
    console.log("✅ Default users created successfully");

    // Display created users
    const users = await User.findAll();
    console.log("\n📋 Created users:");
    users.forEach((user) => {
      console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`);
    });
  } catch (error) {
    console.error("❌ Error seeding users:", error.message);
  }
};

export const seedDatabase = async () => {
  console.log("🌱 Starting database seeding...");
  await seedUsers();
  console.log("✅ Database seeding completed");
};
