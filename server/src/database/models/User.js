import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100],
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255],
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true, // This will add createdAt and updatedAt
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
    },
  }
);

// Instance methods
User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

// Class methods
User.findByEmail = async function (email) {
  return await this.findOne({ where: { email } });
};

User.createUser = async function (userData) {
  return await this.create(userData);
};

export default User;
