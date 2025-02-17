import { DataTypes, Model } from "sequelize";
import sequelize from "./index";
import User from "./user.model";

class SecurityBox extends Model {
  public id!: string;
  public name!: string;
  public favorite!: boolean;
  public icon!: string;
  public user_id!: string;
}

SecurityBox.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    icon: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    user_id: {
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
    modelName: "SecurityBox",
    tableName: "security_box",
    timestamps: false,
  }
);

export default SecurityBox;
