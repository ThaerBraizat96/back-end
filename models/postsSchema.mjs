
const postsSchema = (sequelize, DataTypes) =>
  sequelize.define("posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });

export default postsSchema;
