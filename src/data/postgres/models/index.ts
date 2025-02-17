import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Configuración de Sequelize
const sequelize = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USERNAME_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  host: process.env.HOST_DATABASE,
  port: Number(process.env.PORT_DATABASE),
  dialect: "postgres",
  logging: false, // Desactiva logs en consola
});

export default sequelize;
