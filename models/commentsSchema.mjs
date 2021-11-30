const commentsSchema = (sequelize, DataTypes) => sequelize.define('comments', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body:{
        type:DataTypes.STRING,
        allowNull: false
      },
    postId: {
      type: DataTypes.INTEGER,
     
    }
  });
  export default commentsSchema;
