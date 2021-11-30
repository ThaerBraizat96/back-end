import Sequelize from 'sequelize'
import dotenv from "dotenv";
dotenv.config();

const sequelizeDB = new Sequelize({
database:process.env.DB_NAME,
username:process.env.DB_USER,
password:process.env.DB_PASSWORD,
host: process.env.DB_HOST,
dialect: process.env.DB_DILECT,
});
export default sequelizeDB;

