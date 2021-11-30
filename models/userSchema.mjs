const SECRET = process.env.SECRET || "mysecretkey";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = (sequelizeDB, DataTypes) => {
  const Users = sequelizeDB.define("newUsers", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Users;
};

export default UserSchema;
