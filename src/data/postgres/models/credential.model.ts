import { DataTypes, Model } from "sequelize";
import sequelize from "./index";
import SecurityBox from "./segurity-box.model";
import Pin from "./pin.model";

class Credential extends Model {
  public id!: string;
  public account!: string;
  public password!: string;
  public description?: string;
  public code_1?: string;
  public code_2?: string;
  public security_box_id!: string;
  public pin_id!: string;
}

Credential.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    account: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    code_1: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    code_2: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    security_box_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: SecurityBox,
        key: "id",
      },
    },
    pin_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Pin,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Credential",
    tableName: "credential_storage",
    timestamps: false,
  }
);

export default Credential;
