import { DataTypes, Model } from "sequelize";
import sequelize from "./index";
import User from "./user.model";

class Pin extends Model {
  public id!: string;
  public code!: string;
  public userId!: string;
}

Pin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Pin",
    tableName: "pin",
    timestamps: false,
  }
);

export default Pin;
