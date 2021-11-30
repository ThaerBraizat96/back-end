'use strict';
import sequelizeDB from '../databaseConnection/index.mjs'
import sequelize from 'sequelize'
import dotenv from "dotenv";
dotenv.config();

import userSchema from './userSchema.mjs';
import postsSchema from './postsSchema.mjs';
import commentsSchema from './commentsSchema.mjs';


sequelizeDB.sync()
export const userModel = userSchema(sequelizeDB,sequelize.DataTypes);
export const postModel = postsSchema(sequelizeDB,sequelize.DataTypes);
export const commentsModel = commentsSchema (sequelizeDB,sequelize.DataTypes);