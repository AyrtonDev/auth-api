import { Model, DataTypes } from "sequelize"
import { sequelize } from "@/instances/pg"

export interface UserInstace extends Model {
  id: number
  email: string
  password: string
}

export const User = sequelize.define<UserInstace>(
  "User",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
)
